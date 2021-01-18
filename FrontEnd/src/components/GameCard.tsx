import { Card, Heading ,majorScale,Text} from 'evergreen-ui'
import React from 'react'

interface Props {
  id:string,
  pgn:string,
}

const GameCard = (props: Props) => {
  return (
    <Card background="tint1" elevation={1} padding={majorScale(2)}>
      <Heading>
        id: {props.id}
      </Heading>
      <Text>
        pgn: {props.pgn}
      </Text>
    </Card>
  )
}

export default GameCard
