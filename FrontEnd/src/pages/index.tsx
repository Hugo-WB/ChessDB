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


interface Props {}

interface State {
  search: BasicSearch | AdvancedSearch;
  renderResults: boolean;
}
const initialState: State = {
  search: {
    firstMoves: "",
    player: "",
  },
  renderResults: false,
};

const index = (props: Props) => {
  const [state, setState] = useState(initialState);
  let renderResults = (search: BasicSearch | AdvancedSearch) => {
    setState({
      ...state,
      renderResults: true,
      search: search,
    });
  };
  return (
    <>
      <Pane>
        <Heading>ChessDB</Heading>
      </Pane>
      <Pane>
        <SearchForm renderResults={renderResults} />
      </Pane>
      {/* Results */}
      {state.renderResults ? <Results search={state.search} /> : <div />}
    </>
  );
};

export default index;
