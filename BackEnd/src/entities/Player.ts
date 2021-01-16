import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Collection,
  OneToMany,
} from "@mikro-orm/core";
import { Game } from "./Game";
@Entity()
export class Player {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  name!: string;

  @OneToMany(() => Game, game => game.white)
  whiteGames = new Collection<Game>(this);

  @OneToMany(() => Game,game => game.black)
  blackGames = new Collection<Game>(this);

  @Property({ nullable: true })
  // fide rating
  rating?: number;

  @Property({ type: "text", nullable: true })
  // profile picture url
  profile?: string;

  @Property({ nullable: true })
  links?: string[];
}
