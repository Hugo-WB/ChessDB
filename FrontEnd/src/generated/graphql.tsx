import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
  game?: Maybe<Game>;
  players: Array<Player>;
  player?: Maybe<Player>;
  me?: Maybe<User>;
};


export type QueryGameArgs = {
  id: Scalars['Float'];
};


export type QueryPlayerArgs = {
  id: Scalars['Float'];
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  pgn: Scalars['String'];
  white: Player;
  black: Player;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  rating: Scalars['Int'];
  profile: Scalars['String'];
  links: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: GameResponse;
  updateGame?: Maybe<Game>;
  deleteGame?: Maybe<Game>;
  createPlayer?: Maybe<Player>;
  updatePlayer?: Maybe<Player>;
  deletePlayer?: Maybe<Player>;
  register: User;
  login: UserResponse;
};


export type MutationCreateGameArgs = {
  blackID: Scalars['Float'];
  whiteID: Scalars['Float'];
  pgn: Scalars['String'];
};


export type MutationUpdateGameArgs = {
  pgn?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteGameArgs = {
  id: Scalars['Float'];
};


export type MutationCreatePlayerArgs = {
  games?: Maybe<Array<Scalars['Int']>>;
  rating: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationUpdatePlayerArgs = {
  rating: Scalars['Float'];
  name: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type GameResponse = {
  __typename?: 'GameResponse';
  error?: Maybe<Scalars['String']>;
  game?: Maybe<Game>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesQuery = (
  { __typename?: 'Query' }
  & { games: Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'pgn'>
    & { white: (
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name'>
    ), black: (
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'name'>
    ) }
  )> }
);


export const GetGamesDocument = gql`
    query getGames {
  games {
    id
    pgn
    white {
      id
      name
    }
    black {
      id
      name
    }
  }
}
    `;

/**
 * __useGetGamesQuery__
 *
 * To run a query within a React component, call `useGetGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
        return Apollo.useQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, baseOptions);
      }
export function useGetGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          return Apollo.useLazyQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, baseOptions);
        }
export type GetGamesQueryHookResult = ReturnType<typeof useGetGamesQuery>;
export type GetGamesLazyQueryHookResult = ReturnType<typeof useGetGamesLazyQuery>;
export type GetGamesQueryResult = Apollo.QueryResult<GetGamesQuery, GetGamesQueryVariables>;