import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
} from "@mikro-orm/core";
import {Player} from "./Player"
@Entity()
export class Game {
  @PrimaryKey()
  id!: number;

  // @Property()
  // date:Date = new Date();

  @Property({ type: "text" })
  pgn!: string;


  // define white and black player
  @ManyToOne()
  white: Player

  @ManyToOne()
  black: Player

  // @ManyToOne() // when you provide correct type hint, ORM will read it for you
  // author!: Author;

  // @ManyToOne(() => Publisher) // or you can specify the entity as class reference or string name
  // publisher?: Publisher;

  // @ManyToMany() // owning side can be simple as this!
  // tags = new Collection<BookTag>(this);

  // constructor(title: string, author: Author) {
  //   this.title = title;
  //   this.author = author;
  // }
}
