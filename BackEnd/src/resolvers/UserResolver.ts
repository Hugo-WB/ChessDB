import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";

import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length < 3) {
      return {
        errors: [{ field: "username", message: "username is too short" }],
      };
    }
    if (options.password.length < 3) {
      return {
        errors: [{ field: "password", message: "password is too short" }],
      };
    }
    const hashedPassword: string = await argon2.hash(options.password);
    const user: User = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username is already used!",
            },
          ],
        };
      }
    }
    return { user: user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em,req }: MyContext
  ): Promise<UserResponse> {
    const user: User | null = await em.findOne(User, {
      username: options.username
    });
    if (!user) {
      return {
        errors: [{ field: "username", message: "That username doesn't exist" }],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }

    req.session.userId = user.id;

    return { user: user };
  }
}
