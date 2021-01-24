import { Game } from "../entities/Game";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Player } from "../entities/Player";
import { EntityManager } from "@mikro-orm/postgresql";

@ObjectType()
class GameResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => [Game], { nullable: true })
  games: Game[];
}

@Resolver(Game)
export class GameResovler {
  // GET
  @Query(() => GameResponse)
  async games(
    @Arg("id", () => Int, { nullable: true }) gameId: number,
    @Arg("playerId", () => Int, { nullable: true }) playerId: number,
    @Arg("maxLength", () => Int, { nullable: true }) maxLength: number,
    @Arg("minLength", () => Int, { nullable: true }) minLength: number,
    @Arg("opening", { nullable: true }) opening: string,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 20 })
    limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
    @Arg("result", () => String, { nullable: true }) result: string,
    @Ctx() { em }: MyContext
  ): Promise<GameResponse> {
    try {
      let results = await (em as EntityManager)
        .createQueryBuilder(Game)
        .getKnexQuery()
        .orderBy("average_rating", "desc")
        .where(
          Object.assign(
            {},
            gameId === undefined ? null : { id: gameId },
            opening === undefined ? null : { opening: opening },
            result === undefined ? null : { result: result }
          )
        )
        .andWhere((builder) => {
          if (playerId) {
            builder
              .where({ white_id: playerId })
              .orWhere({ black_id: playerId });
          }
          if (maxLength) {
            builder.where("length", "<=", maxLength);
          }
          if (minLength) {
            builder.where("length", ">=", minLength);
          }
        })
        .offset(offset ?? 0)
        .limit(Math.min(limit, 50));
      let games: Game[] = await Promise.all(
        results.map(async (result: any) => {
          let game: Game = em.map(Game, result);
          game.white = await em.findOneOrFail(Player, { id: game.white.id });
          game.black = await em.findOneOrFail(Player, { id: game.black.id });
          return game;
        })
      );
      console.log(games);
      return { games: games };
    } catch (error) {
      console.log(error);
      return { error: error };
    }
  }

  @Mutation(() => GameResponse)
  async createGame(
    @Arg("pgn") pgn: string,
    @Arg("whiteID", () => Int) whiteID: number,
    @Arg("blackID", () => Int) blackID: number,
    @Arg("blackMoves", () => [String]) blackMoves: string[],
    @Arg("whiteMoves", () => [String]) whiteMoves: string[],
    @Arg("opening", () => String) opening: string,
    @Arg("length", () => Int) length: number,
    @Arg("playDate", () => String) playDate: string,
    @Arg("result", () => String) result: string,
    @Arg("averageRating", () => Int, { nullable: true })
    averageRating: number,
    @Ctx()
    { em }: MyContext
  ): Promise<GameResponse> {
    try {
      averageRating = averageRating ?? 1;
      const whiteRef = em.getReference(Player, whiteID);
      const blackRef = em.getReference(Player, blackID);
      const game: Game = em.create(Game, {
        pgn: pgn,
        white: whiteRef,
        black: blackRef,
        blackMoves: blackMoves,
        whiteMoves: whiteMoves,
        opening: opening,
        length: length,
        playedAt: playDate,
        result: result,
        averageRating: averageRating,
      });
      await em.persistAndFlush(game);

      return { games: [game] };
    } catch (error) {
      if (error?.detail?.includes("already exists")) {
        return { error: "This game already exists in the database" };
      }
      console.log(error);
      return { error: error };
    }
  }

  @Mutation(() => Game, { nullable: true })
  async updateGame(
    @Arg("id") id: number,
    @Arg("pgn", { nullable: true }) pgn: string,
    @Ctx()
    { em }: MyContext
  ): Promise<Game | null> {
    const game: Game | null = await em.findOne(Game, { id });
    if (!game) {
      return null;
    }
    if (pgn) {
      game.pgn = pgn;
    }
    await em.persistAndFlush(game);
    return game;
  }

  @Mutation(() => Game, { nullable: true })
  async deleteGame(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Game | null> {
    let game = await em.findOne(Game, { id });
    if (!game) {
      return null;
    }
    await em.nativeDelete(Game, { id });
    return game;
  }
}
