// React:
import React, { useState } from "react";

// Evergreen:
import {
  Autocomplete,
  Button,
  Combobox,
  Heading,
  Pane,
  TextInput,
} from "evergreen-ui";

// Types:
import { BasicSearch, AdvancedSearch } from "./types";

// Components:
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";
import { GET_GAMES } from "../graphql/queries";
import { useQuery } from "@apollo/client";


interface Props {}

const index = (props: Props) => {

  const {loading,error,data} = useQuery(GET_GAMES);
  if (loading) return "Loading..."
  return (
    <>
      <Pane>
        <Heading>ChessDB</Heading>
      </Pane>
      <Pane>
        {data.games.map((game)=>game.pgn)}
      </Pane>
    </>
  );
};

export default index;
