import { Card, Heading, majorScale, Text } from "evergreen-ui";
import React from "react";
import { Game } from "../graphql/graphql";

interface Props {
  game: Game;
}

const GameCard = (props: Props) => {
  console.log(props.game);
  return (
    <Card background="tint1" elevation={1} padding={majorScale(2)} width={300}>
      <Text>pgn: {props.game.white.name}</Text>
    </Card>
  );
};

export default GameCard;
