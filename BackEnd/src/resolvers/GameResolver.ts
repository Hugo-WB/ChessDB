import { Game } from "../entities/Game";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

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

  @Mutation(() => Game)
  async createGame(
    @Arg("pgn") pgn: string,
    // @Arg("white", () => Player) white: Player,
    // @Arg("black", () => Player) black: Player,
    @Ctx()
    { em }: MyContext
  ): Promise<Game> {
    const game = em.create(Game, { pgn: pgn });
    await em.persistAndFlush(game);
    return game;
  }

  @Mutation(() => Game, { nullable: true })
  async updateGame(
    @Arg("id") id: number,
    @Arg("pgn", { nullable: true }) pgn: string,
    // @Arg("white", () => Player,{nullable:true}) white: Player,
    // @Arg("black", () => Player,{nullable:true}) black: Player,
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
