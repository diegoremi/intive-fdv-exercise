import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import Input from "./Input";
import playerPositions from "../../playerPositions";

const PlayerSearch = ({ onSearch }) => (
  <div className="player-search">
    <Formik
      validateOnChange
      initialValues={{
        name: "",
        position: "",
        age: ""
      }}
      validate={values => {
        if (/[^A-za-z ]/.test(values.name)) {
          return { name: "Please write only letters or white spaces" };
        }

        return {};
      }}
      onSubmit={onSearch}
    >
      {({ handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col md={3}>
                <Field
                  component={Input}
                  type="text"
                  name="name"
                  label="Name"
                  error={errors.name}
                />
                <ErrorMessage name="name">
                  {msg => <Alert color="warning">{msg}</Alert>}
                </ErrorMessage>
              </Col>
              <Col md={3}>
                <Field
                  label="Position"
                  component={Input}
                  type="select"
                  name="position"
                  id="formPosition"
                >
                  <option value=""> </option>
                  {playerPositions.map(position => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </Field>
              </Col>
              <Col md={3}>
                <Field
                  label="Age"
                  component={Input}
                  type="number"
                  name="age"
                  min="18"
                  max="40"
                />
              </Col>
              <Col md={3} style={{ position: "relative", top: "30px" }}>
                <Button color="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      )}
    </Formik>
  </div>
);

PlayerSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default PlayerSearch;
