import { gql } from "@apollo/client";

const GET_GAMES = gql`
  query getGames (){
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

const GET_GAME = gql`
  query getGame($id: String!) {
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
`;
