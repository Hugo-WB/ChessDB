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
    @Arg("id", { nullable: true }) gameId: number,
    @Arg("playerId", { nullable: true }) playerId: number,
    @Arg("maxLength", { nullable: true }) maxLength: number,
    @Arg("minLength", { nullable: true }) minLength: number,
    @Arg("opening", { nullable: true }) opening: string,
    @Ctx() { em }: MyContext
  ): Promise<Game[]> {
    let results = await (em as EntityManager)
      .createQueryBuilder(Game)
      .getKnexQuery()
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
          builder.where("maxLength", ">=", "length");
        }
        if (minLength) {
          builder.where("minLength", "<=", "length");
        }
      });
    let games: Game[] = results.map((result: any) => em.map(Game, result));
    return games;
    // if (gameId != undefined) {
    //   return em.find(Game, { id: gameId });
    // }
    // return em.find(Game, {}, {});
  }

  @Mutation(() => GameResponse)
  async createGame(
    @Arg("pgn") pgn: string,
    @Arg("whiteID") whiteID: number,
    @Arg("blackID") blackID: number,
    @Arg("blackMoves",()=>[String]) blackMoves:string[],
    @Arg("whiteMoves",()=>[String]) whiteMoves:string[],
    @Arg("opening",()=>String) opening:string,
    @Arg("length",()=>Int) length:number,
    @Arg("playDate",()=>String) playDate:string,
    @Arg("whiteWin",()=>Boolean) whiteWin:boolean,
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
        blackMoves:blackMoves,
        whiteMoves:whiteMoves,
        opening:opening,
        length:length,
        playedAt:playDate,
        whiteWin:whiteWin
      });
      await em.persistAndFlush(game);

      return { game };
    } catch (error) {
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
