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

  // @OneToMany(()=> Game,game => game.id )
  @OneToMany(()=> Game,game => [game.white,game.black] )
  games =  new Collection<Game>(this);

  @Property()
  // fide rating
  rating?: number;

  @Property({type:"text"})
  // profile picture url
  profile?:string;

  @Property()
  links?:string[];


}
