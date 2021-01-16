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
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  pgn!: string;

  @Field(() => Player)
  @ManyToOne({ nullable: true })
  white?: Player;

  @Field(() => Player)
  @ManyToOne({ nullable: true })
  black?: Player;
}
