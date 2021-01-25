import { Spinner } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { GetGamesDocument, useGetGamesQuery } from "../graphql/graphql";
import { AdvancedSearch, BasicSearch } from "../pages/types";
import GameCard from "./GameCard";

interface Props {}

const Results = (props: Props) => {
  const { loading, error, data } = useGetGamesQuery({ variables: {limit:5} });

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    <div>error</div>;
  }
  console.log(data);
  return (
    <div>
      {data?.games.games?.map((game) => {
        return <GameCard game={game} />;
      })}
    </div>
  );
};

export default Results;
