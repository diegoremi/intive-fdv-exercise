import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import CustomInput from "./Input";

configure({ adapter: new Adapter() });

it("CustomInput", () => {
  const field = { field: "field" };
  const error = "Error message";
  const form = { form: "form" };
  const children = <span>Children</span>;
  const otherProps = { other: "other" };

  const input = shallow(
    <CustomInput
      label="Test"
      name="test"
      field={field}
      error={error}
      form={form}
      {...otherProps}
    >
      {children}
    </CustomInput>
  );

  expect(
    input.matchesElement(
      <FormGroup>
        <Label for="form-name-test">Test</Label>
        <Input {...otherProps} {...field} id="form-name-test">
          {children}
        </Input>
      </FormGroup>
    )
  );
});
