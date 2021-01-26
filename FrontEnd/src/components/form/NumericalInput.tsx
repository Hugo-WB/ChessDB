import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = NumberInputProps & {
  name: string;
  label: string;
  min?: number;
  max?: number;
};

const NumericalInput = ({ label, min, max, size: _, ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <NumberInput
        id={field.name}
        placeholder={props.placeholder}
        {...field}
        onChange={(value) => {
          helpers.setValue(value);
        }}
        min = {min}
        max = {max}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default NumericalInput;
