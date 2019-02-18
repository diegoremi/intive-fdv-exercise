import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const CustomInput = ({ field, error, form, children, ...props }) => {
  const id = `form-field-${field.name}`;
  return (
    <FormGroup>
      <Label for={id}>{props.label}</Label>
      <Input {...props} {...field} id={id}>
        {children}
      </Input>
    </FormGroup>
  );
};

export default CustomInput;
