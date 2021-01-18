import { Game } from "../entities/Game";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Player } from "../entities/Player";
import { Collection } from "@mikro-orm/core";

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
  games(@Ctx() { em }: MyContext): Promise<Game[]> {
    return em.find(Game, {});
  }

  @Query(() => Game, { nullable: true })
  game(@Arg("id") id: number, @Ctx() { em }: MyContext): Promise<Game | null> {
    return em.findOne(Game, { id });
  }

  @Mutation(() => GameResponse)
  async createGame(
    @Arg("pgn") pgn: string,
    @Arg("whiteID") whiteID: number,
    @Arg("blackID") blackID: number,
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
    // let [white, black] = await Promise.all([
    //   em.findOneOrFail(Player, { id: game.white.id }),
    //   em.findOneOrFail(Player, { id: game.black.id }),
    // ]);
    // white.games.slice(white.games.indexOf(game.id));
    // black.games.slice(black.games.indexOf(game.id));
    // await em.flush();
    await em.nativeDelete(Game, { id });
    return game;
  }
}
