import { gql } from "@apollo/client";

export const GET_GAMES = gql`
query getGames{
  games{
    id
    pgn
    white{
      id
      name
    }
    black{
      id
      name
    }
  }
}
`