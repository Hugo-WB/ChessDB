import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Game {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  playedAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  pgn!: string;

  @Field(() => Player)
  @ManyToOne()
  white!: Player;

  @Field(() => Player)
  @ManyToOne()
  black!: Player;

  @Field(() => String)
  @Property()
  result!: string;

  @Field(() => Int)
  @Property()
  length!: number;

  @Field(() => String)
  @Property({ type: "text" })
  opening!: string;

  @Field(() => [String])
  @Property()
  whiteMoves: string[];

  @Field(() => [String])
  @Property()
  blackMoves: string[];

  @Field(() => Int)
  @Property()
  averageRating: number;
}
