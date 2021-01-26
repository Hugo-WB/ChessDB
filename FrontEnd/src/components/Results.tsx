import { StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  GetGamesDocument,
  GetGamesQueryVariables,
  useGetGamesQuery,
} from "../graphql/graphql";
import { AdvancedSearch, BasicSearch } from "../pages/types";
import GameCard from "./GameCard";

interface Props {
  query: GetGamesQueryVariables;
}

const Results = ({ query }: Props) => {
  const { loading, error, data } = useGetGamesQuery({
    variables: { limit: 10, ...query },
  });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    <div>error</div>;
  }
  console.log(data);
  return (
    <VStack
      // divider={<StackDivider borderColor="gray.200" />}
      p={8}
    >
      {data?.games.games?.map((game) => {
        return <GameCard game={game} />;
      })}
    </VStack>
  );
};

export default Results;
