import { Player } from "../entities/Player";
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
import { MyContext } from "src/types";
import { EntityManager } from "@mikro-orm/postgresql";

@ObjectType()
class PlayerResponse {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => [Player], { nullable: true })
  players?: Player[];
}

@Resolver()
export class PlayerResovler {
  @Query(() => [Player])
  async players(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("name", { nullable: true }) name: string,
    // @Arg("maxRating",()=>Int, { nullable: true }) maxRating: number,
    // @Arg("minRating", ()=>Int,{ nullable: true }) minRating: number,
    @Arg("limit", () => Int, { nullable: true, defaultValue: 20 })
    limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
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
      )
      .orderBy("rating", "desc")
      .offset(offset ?? 0)
      .limit(Math.min(limit, 30));
    let players: Player[] = results.map((player: any) =>
      em.map(Player, player)
    );
    return players;
  }

  @Query(() => [Player])
  async searchPlayer(
    @Arg("SearchTerms", () => [String]) searchTerms: string[],
    @Ctx() { em }: MyContext
  ) {
    searchTerms = searchTerms.map((term) => "(?=.*" + term + ")");
    console.log(searchTerms);
    let results = await (em as EntityManager)
      .createQueryBuilder(Player)
      .getKnexQuery()
      .where("name", "~*", searchTerms.join(""))
      .limit(10);
    let players: Player[] = results.map((player: any) =>
      em.map(Player, player)
    );
    return players;
  }

  @Mutation(() => PlayerResponse, { nullable: true })
  async createPlayer(
    @Arg("name") name: string,
    @Arg("rating", () => Int, { nullable: true, defaultValue: 0 })
    rating: number,
    @Ctx() { em }: MyContext
  ): Promise<PlayerResponse> {
    try {
      const player = em.create(Player, {
        name: name,
        rating: rating,
      });
      await em.persistAndFlush(player);
      return { players: [player] };
    } catch (error) {
      if (error?.detail?.includes("already exists")) {
        return { error: "This player already exists in the database" };
      }
      console.log(error);
      return { error: error };
    }
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
