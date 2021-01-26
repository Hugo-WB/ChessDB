import React from "react";
import { Form, Formik } from "formik";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import TextInput from "./form/TextInput";
import SelectInput from "./form/SelectInput";
import NumericalInput from "./form/NumericalInput";
import {
  GetGamesQueryVariables,
  SearchPlayersDocument,
  SearchPlayersQueryResult,
  useSearchPlayersLazyQuery,
} from "../graphql/graphql";
import { useApolloClient } from "@apollo/client";

interface FormValues {
  player: string;
  opening: string;
  result: "1 - 0" | "0 - 1" | "1/2 - 1/2" | "";
  minLength: string;
  maxLength: string;
}

interface Props {
  setQuery: (query: GetGamesQueryVariables) => void;
}

const SearchForm = ({ setQuery }: Props) => {
  let [getPlayers, { loading, data }] = useSearchPlayersLazyQuery();
  const client = useApolloClient();
  if (data) {
  }
  return (
    <Formik
      initialValues={{
        player: "",
        opening: "",
        result: "",
        minLength: "0",
        maxLength: "100",
      }}
      onSubmit={async (values: FormValues, { setSubmitting }) => {
        const { data }: SearchPlayersQueryResult = await client.query({
          query: SearchPlayersDocument,
          variables: { searchTerms: values.player.split(/\s|,/) },
        });
        const resultConverter = {
          "1 - 0": "1-0",
          "0 - 1": "0-1",
          "1/2 - 1/2": "1/2-1/2",
        };
        let ids = data?.searchPlayer.map((player) => player.id);
        let query: GetGamesQueryVariables = {
          minLength: parseInt(values.minLength),
          maxLength: parseInt(values.maxLength),
          result: values.result ? resultConverter[values.result] : undefined,
          opening: values.opening ? values.opening : undefined,
          playerIds: ids,
        };
        setQuery(query);
        setSubmitting(false);
      }}
      validate={(values) => {
        let errors: any = {};
        if (values.maxLength < values.minLength) {
          errors.minLength = "Min must be < Max";
          errors.maxLength = "Max must be > Min";
        }
        return errors;
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid
            templateColumns={"repeat(auto-fit,minmax(200px,1fr))"}
            gap={5}
            autoFlow="row"
          >
            <GridItem colSpan={2}>
              <TextInput name="player" placeholder="Player" label="Player" />
            </GridItem>
            <GridItem colSpan={2}>
              <TextInput name="opening" placeholder="Opening" label="Opening" />
            </GridItem>
            <GridItem colSpan={2}>
              <SelectInput
                name="result"
                placeholder="Result"
                label="Result"
                options={["1 - 0", "0 - 1", "1/2 - 1/2"]}
              />
            </GridItem>
            <GridItem>
              <NumericalInput
                label="Min Length"
                name="minLength"
                placeholder="0"
                min={0}
              />
            </GridItem>
            <GridItem>
              <NumericalInput
                label="Max Length"
                name="maxLength"
                placeholder="100"
                min={1}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
              <Button type="submit" isLoading={isSubmitting}>
                Search
              </Button>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
