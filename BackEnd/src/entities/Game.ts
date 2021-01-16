import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Game {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

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
