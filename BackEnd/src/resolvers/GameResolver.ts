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
import { Collection, Filter } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

@ObjectType()
class GameResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Game, { nullable: true })
  game?: Game;
}

@Resolver(Game)
export class GameResovler {
  // GET
  @Query(() => [Game])
  async games(
    @Arg("id", () => Int, { nullable: true }) gameId: number,
    @Arg("playerId", () => Int, { nullable: true }) playerId: number,
    @Arg("maxLength", () => Int, { nullable: true }) maxLength: number,
    @Arg("minLength", () => Int, { nullable: true }) minLength: number,
    @Arg("opening", { nullable: true }) opening: string,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 20 })
    limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
    @Ctx() { em }: MyContext
  ): Promise<Game[]> {
    let results = await (em as EntityManager)
      .createQueryBuilder(Game)
      .getKnexQuery()
      .orderBy("average_rating", "desc")
      .where(
        Object.assign(
          {},
          gameId === undefined ? null : { id: gameId },
          opening === undefined ? null : { opening: opening }
        )
      )
      .andWhere((builder) => {
        if (playerId) {
          builder.where({ white_id: playerId }).orWhere({ black_id: playerId });
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
    let games: Game[] = results.map((result: any) => em.map(Game, result));
    return games;
  }

  @Mutation(() => GameResponse)
  async createGame(
    @Arg("pgn") pgn: string,
    @Arg("whiteID") whiteID: number,
    @Arg("blackID") blackID: number,
    @Arg("blackMoves", () => [String]) blackMoves: string[],
    @Arg("whiteMoves", () => [String]) whiteMoves: string[],
    @Arg("opening", () => String) opening: string,
    @Arg("length", () => Int) length: number,
    @Arg("playDate", () => String) playDate: string,
    @Arg("winner", () => Int) winner: number,
    @Arg("averageRating", () => Int) averageRating: number,
    @Ctx()
    { em }: MyContext
  ): Promise<GameResponse> {
    try {
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
        winner: winner,
        averageRating: averageRating,
      });
      await em.persistAndFlush(game);

      return { game };
    } catch (error) {
      console.log(error);
      // return { error: "Error creating, make sure played id is correct!" };
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
