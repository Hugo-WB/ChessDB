import { Player } from "../entities/Player";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { Game } from "../entities/Game";

@Resolver()
export class PlayerResovler {
  @Query(() => [Player])
  players(@Ctx() { em }: MyContext): Promise<Player[]> {
    return em.find(Player, {});
  }

  @Query(() => Player, { nullable: true })
  player(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Player | null> {
    return em.findOne(Player, { id });
  }

  @Mutation(() => Player, { nullable: true })
  async createPlayer(
    @Arg("name") name: string,
    @Arg("rating") rating: number,
    @Ctx() { em }: MyContext
  ): Promise<Player> {
    const player = em.create(Player, {
      name: name,
      rating: rating,
    });
    await em.persistAndFlush(player);
    return player;
  }

  @Mutation(() => Player, { nullable: true })
  async updatePlayer(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("rating") rating: number,
    @Ctx() { em }: MyContext
  ): Promise<Player | null> {
    const player = await em.findOne(Player, { id });
    if (!player) {
      return null;
    }
    player.name = name;
    player.rating = rating;
    await em.persistAndFlush(player);
    return player;
  }

  @Mutation(() => Player, { nullable: true })
  async deletePlayer(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Player | null> {
    let player = await em.findOne(Player, { id });
    if (!player) {
      return null;
    }
    await em.nativeDelete(Player, { id });
    return player;
  }
}
