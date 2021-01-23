import { Player } from "../entities/Player";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { EntityManager } from "@mikro-orm/postgresql";

@Resolver()
export class PlayerResovler {
  @Query(() => [Player])
  async players(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("name", { nullable: true }) name: string,
    // @Arg("maxRating",()=>Int, { nullable: true }) maxRating: number,
    // @Arg("minRating", ()=>Int,{ nullable: true }) minRating: number,
    @Ctx() { em }: MyContext
  ): Promise<Player[]> {
    let results = await (em as EntityManager)
      .createQueryBuilder(Player)
      .getKnexQuery()
      .where(
        Object.assign(
          {},
          id === undefined ? null : { id },
          name === undefined ? null : { name }
        )
      );
    let players: Player[] = results.map((player: any) =>
      em.map(Player, player)
    );
    console.log;
    return players;
  }

  @Mutation(() => Player, { nullable: true })
  async createPlayer(
    @Arg("name") name: string,
    @Arg("rating", () => Int, { nullable: true, defaultValue: 0 })
    rating: number,
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
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("rating", () => Int) rating: number,
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
    @Arg("id", () => Int) id: number,
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
