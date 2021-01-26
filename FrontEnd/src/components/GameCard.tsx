import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  Game,
  useGetDetailedGameLazyQuery,
  useGetGamesLazyQuery,
} from "../graphql/graphql";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [getGames, { loading, data }] = useGetDetailedGameLazyQuery({
    variables: { id: game.id },
  });
  return (
    <Flex
      w={[300, 400, 800]}
      p={3}
      borderWidth="1px"
      borderRadius="4px"
      m="4px"
      direction="row"
      flexWrap={"wrap"}
      alignItems="center"
    >
      <Text w={[130, 160, 300]} pl={3}>
        {game.white.name} VS {game.black.name}
      </Text>
      <Text>{game.length}</Text>
      <Text align="center">{game.result}</Text>

      <Spacer />
      <Button
        colorScheme="gray"
        variant="solid"
        mr="4"
        onClick={() => {
          console.log("waguan");
          getGames();
          // document.location.href = "https://lichess.org/";
        }}
      >
        Lichess
      </Button>
      <Button colorScheme={"green"} variant="solid">
        Chess.com
      </Button>
    </Flex>
  );
};

export default GameCard;
