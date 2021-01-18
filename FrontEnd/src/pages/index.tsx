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
import { useQuery } from "@apollo/client";
import { GetGamesDocument, useGetGamesQuery } from "../graphql/graphql";


interface Props {}

const index = (props: Props) => {

  let {error,loading,data} = useGetGamesQuery();
  if (!data) return "Loading..."
  return (
    <>
      <Pane>
        <Heading>ChessDB</Heading>
      </Pane>
      <Pane>
        {/* {data.games.map((game)=>game.pgn)} */}
      </Pane>
    </>
  );
};

export default index;
