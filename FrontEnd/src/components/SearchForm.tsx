import React from "react";
import { Form, Formik } from "formik";
import { TextInput, Button } from "evergreen-ui";
import { BasicSearch, AdvancedSearch } from "../pages/types";

interface Props {
  renderResults: (search: BasicSearch | AdvancedSearch) => void;
}

const basicInitial: BasicSearch = {
  player: "",
  firstMoves: "",
};

const SearchForm = (props: Props) => {
  return (
    <Formik
      initialValues={basicInitial}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        props.renderResults(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <TextInput
            name="firstMoves"
            placeholder="e4,e5"
            onChange={handleChange}
            value={values.firstMoves}
          />
          <TextInput
            name="player"
            placeholder="Magnus Carlsen"
            onChange={handleChange}
            value={values.player}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
