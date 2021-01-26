// React:
import React, { useState } from "react";

// Types:
import { BasicSearch, AdvancedSearch } from "./types";

// Components:
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";
import { Box } from "@chakra-ui/react";
import { GetGamesQueryVariables } from "../graphql/graphql";

interface Props {}

const index = (props: Props) => {
  let [query, setQuery] = useState<GetGamesQueryVariables | undefined>(
    undefined
  );
  return (
    <Box mt={8} mx="auto" maxW="800px" w="100%">
      <SearchForm setQuery={setQuery} />
      {query ? <Results query={query} /> : null}
    </Box>
  );
};

export default index;
