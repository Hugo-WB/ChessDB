import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Game } from "./Game";


@ObjectType()
@Entity()
export class Player {
  @Field(()=>Int)
  @PrimaryKey()
  id!: number;

  @Field(()=>String)
  @Property({ type: "text" })
  name!: string;

  @OneToMany(() => Game, (game) => game.white)
  whiteGames = new Collection<Game>(this);

  @OneToMany(() => Game, (game) => game.black)
  blackGames = new Collection<Game>(this);

  @Field(()=>[Int])
  @Property({ nullable: true })
  games?: number[];

  @Field(()=>Int)
  @Property({ nullable: true })
  // fide rating
  rating?: number;

  @Field(()=>String)
  @Property({ type: "text", nullable: true })
  // profile picture url
  profile?: string;

  @Field(()=>[String])
  @Property({ nullable: true })
  links?: string[];
}
