import { Entity, PrimaryKey, Property, OneToMany} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Game } from "./Game";

@ObjectType()
@Entity()
export class Player {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "text",unique:true })
  name!: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Game, (game: Game) => game.white)
  whiteGames: Game[];

  @OneToMany(() => Game, (game: Game) => game.black)
  blackGames: Game[];

  @Field(() => Int)
  @Property({ nullable: true })
  // fide rating
  rating?: number;

  @Field(() => String)
  @Property({ type: "text", nullable: true })
  // profile picture url
  profile?: string;

  @Field(() => [String])
  @Property({ nullable: true })
  links?: string[];
}
