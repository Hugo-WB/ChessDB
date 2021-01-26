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
  games: GameResponse;
  players: Array<Player>;
  searchPlayer: Array<Player>;
  me?: Maybe<User>;
};


export type QueryGamesArgs = {
  result?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  opening?: Maybe<Scalars['String']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  playerIds?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['Int']>;
};


export type QueryPlayersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};


export type QuerySearchPlayerArgs = {
  SearchTerms: Array<Scalars['String']>;
};

export type GameResponse = {
  __typename?: 'GameResponse';
  error?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Game>>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Int'];
  playedAt: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  pgn: Scalars['String'];
  white: Player;
  black: Player;
  result: Scalars['String'];
  length: Scalars['Int'];
  opening: Scalars['String'];
  whiteMoves: Array<Scalars['String']>;
  blackMoves: Array<Scalars['String']>;
  averageRating: Scalars['Int'];
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
  createPlayer?: Maybe<PlayerResponse>;
  updatePlayer?: Maybe<Player>;
  deletePlayer?: Maybe<Player>;
  register: User;
  login: UserResponse;
};


export type MutationCreateGameArgs = {
  averageRating?: Maybe<Scalars['Int']>;
  result: Scalars['String'];
  playDate: Scalars['String'];
  length: Scalars['Int'];
  opening: Scalars['String'];
  whiteMoves: Array<Scalars['String']>;
  blackMoves: Array<Scalars['String']>;
  blackID: Scalars['Int'];
  whiteID: Scalars['Int'];
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
  rating?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};


export type MutationUpdatePlayerArgs = {
  rating: Scalars['Int'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type PlayerResponse = {
  __typename?: 'PlayerResponse';
  error?: Maybe<Scalars['String']>;
  players?: Maybe<Array<Player>>;
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

export type GetGamesQueryVariables = Exact<{
  result?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  opening?: Maybe<Scalars['String']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  playerIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
}>;


export type GetGamesQuery = (
  { __typename?: 'Query' }
  & { games: (
    { __typename?: 'GameResponse' }
    & Pick<GameResponse, 'error'>
    & { games?: Maybe<Array<(
      { __typename?: 'Game' }
      & Pick<Game, 'id' | 'playedAt' | 'averageRating' | 'result'>
      & { white: (
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'name' | 'rating'>
      ), black: (
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'name' | 'rating'>
      ) }
    )>> }
  ) }
);

export type GetDetailedGameQueryVariables = Exact<{
  result?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  opening?: Maybe<Scalars['String']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  playerIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
}>;


export type GetDetailedGameQuery = (
  { __typename?: 'Query' }
  & { games: (
    { __typename?: 'GameResponse' }
    & Pick<GameResponse, 'error'>
    & { games?: Maybe<Array<(
      { __typename?: 'Game' }
      & Pick<Game, 'id' | 'playedAt' | 'averageRating' | 'result' | 'whiteMoves' | 'blackMoves' | 'pgn' | 'length' | 'opening'>
      & { white: (
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'name' | 'rating'>
      ), black: (
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'name' | 'rating'>
      ) }
    )>> }
  ) }
);

export type SearchPlayersQueryVariables = Exact<{
  searchTerms: Array<Scalars['String']> | Scalars['String'];
}>;


export type SearchPlayersQuery = (
  { __typename?: 'Query' }
  & { searchPlayer: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id'>
  )> }
);

export type GetPlayersQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
}>;


export type GetPlayersQuery = (
  { __typename?: 'Query' }
  & { players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name' | 'rating'>
  )> }
);

export type GetDetailedPlayerQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
}>;


export type GetDetailedPlayerQuery = (
  { __typename?: 'Query' }
  & { players: Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name' | 'rating' | 'createdAt' | 'profile' | 'links'>
  )> }
);


export const GetGamesDocument = gql`
    query GetGames($result: String, $offset: Int, $limit: Int, $opening: String, $minLength: Int, $maxLength: Int, $playerIds: [Int!], $id: Int) {
  games(
    result: $result
    offset: $offset
    limit: $limit
    opening: $opening
    minLength: $minLength
    maxLength: $maxLength
    playerIds: $playerIds
    id: $id
  ) {
    error
    games {
      id
      playedAt
      averageRating
      result
      white {
        id
        name
        rating
      }
      black {
        id
        name
        rating
      }
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
 *      result: // value for 'result'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      opening: // value for 'opening'
 *      minLength: // value for 'minLength'
 *      maxLength: // value for 'maxLength'
 *      playerIds: // value for 'playerIds'
 *      id: // value for 'id'
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
export const GetDetailedGameDocument = gql`
    query GetDetailedGame($result: String, $offset: Int, $limit: Int, $opening: String, $minLength: Int, $maxLength: Int, $playerIds: [Int!], $id: Int) {
  games(
    result: $result
    offset: $offset
    limit: $limit
    opening: $opening
    minLength: $minLength
    maxLength: $maxLength
    playerIds: $playerIds
    id: $id
  ) {
    error
    games {
      id
      playedAt
      averageRating
      result
      whiteMoves
      blackMoves
      pgn
      length
      opening
      white {
        id
        name
        rating
      }
      black {
        id
        name
        rating
      }
    }
  }
}
    `;

/**
 * __useGetDetailedGameQuery__
 *
 * To run a query within a React component, call `useGetDetailedGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailedGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailedGameQuery({
 *   variables: {
 *      result: // value for 'result'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      opening: // value for 'opening'
 *      minLength: // value for 'minLength'
 *      maxLength: // value for 'maxLength'
 *      playerIds: // value for 'playerIds'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDetailedGameQuery(baseOptions?: Apollo.QueryHookOptions<GetDetailedGameQuery, GetDetailedGameQueryVariables>) {
        return Apollo.useQuery<GetDetailedGameQuery, GetDetailedGameQueryVariables>(GetDetailedGameDocument, baseOptions);
      }
export function useGetDetailedGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDetailedGameQuery, GetDetailedGameQueryVariables>) {
          return Apollo.useLazyQuery<GetDetailedGameQuery, GetDetailedGameQueryVariables>(GetDetailedGameDocument, baseOptions);
        }
export type GetDetailedGameQueryHookResult = ReturnType<typeof useGetDetailedGameQuery>;
export type GetDetailedGameLazyQueryHookResult = ReturnType<typeof useGetDetailedGameLazyQuery>;
export type GetDetailedGameQueryResult = Apollo.QueryResult<GetDetailedGameQuery, GetDetailedGameQueryVariables>;
export const SearchPlayersDocument = gql`
    query SearchPlayers($searchTerms: [String!]!) {
  searchPlayer(SearchTerms: $searchTerms) {
    id
  }
}
    `;

/**
 * __useSearchPlayersQuery__
 *
 * To run a query within a React component, call `useSearchPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPlayersQuery({
 *   variables: {
 *      searchTerms: // value for 'searchTerms'
 *   },
 * });
 */
export function useSearchPlayersQuery(baseOptions: Apollo.QueryHookOptions<SearchPlayersQuery, SearchPlayersQueryVariables>) {
        return Apollo.useQuery<SearchPlayersQuery, SearchPlayersQueryVariables>(SearchPlayersDocument, baseOptions);
      }
export function useSearchPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPlayersQuery, SearchPlayersQueryVariables>) {
          return Apollo.useLazyQuery<SearchPlayersQuery, SearchPlayersQueryVariables>(SearchPlayersDocument, baseOptions);
        }
export type SearchPlayersQueryHookResult = ReturnType<typeof useSearchPlayersQuery>;
export type SearchPlayersLazyQueryHookResult = ReturnType<typeof useSearchPlayersLazyQuery>;
export type SearchPlayersQueryResult = Apollo.QueryResult<SearchPlayersQuery, SearchPlayersQueryVariables>;
export const GetPlayersDocument = gql`
    query GetPlayers($offset: Int, $limit: Int, $name: String, $id: Int) {
  players(offset: $offset, limit: $limit, name: $name, id: $id) {
    id
    name
    rating
  }
}
    `;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;
export const GetDetailedPlayerDocument = gql`
    query GetDetailedPlayer($offset: Int, $limit: Int, $name: String, $id: Int) {
  players(offset: $offset, limit: $limit, name: $name, id: $id) {
    id
    name
    rating
    createdAt
    profile
    links
  }
}
    `;

/**
 * __useGetDetailedPlayerQuery__
 *
 * To run a query within a React component, call `useGetDetailedPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailedPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailedPlayerQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDetailedPlayerQuery(baseOptions?: Apollo.QueryHookOptions<GetDetailedPlayerQuery, GetDetailedPlayerQueryVariables>) {
        return Apollo.useQuery<GetDetailedPlayerQuery, GetDetailedPlayerQueryVariables>(GetDetailedPlayerDocument, baseOptions);
      }
export function useGetDetailedPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDetailedPlayerQuery, GetDetailedPlayerQueryVariables>) {
          return Apollo.useLazyQuery<GetDetailedPlayerQuery, GetDetailedPlayerQueryVariables>(GetDetailedPlayerDocument, baseOptions);
        }
export type GetDetailedPlayerQueryHookResult = ReturnType<typeof useGetDetailedPlayerQuery>;
export type GetDetailedPlayerLazyQueryHookResult = ReturnType<typeof useGetDetailedPlayerLazyQuery>;
export type GetDetailedPlayerQueryResult = Apollo.QueryResult<GetDetailedPlayerQuery, GetDetailedPlayerQueryVariables>;