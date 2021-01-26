import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  options: string[];
};

const SelectInput = ({ label, options, size: _, ...props }: Props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select id={field.name} placeholder={props.placeholder} {...field}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default SelectInput;
