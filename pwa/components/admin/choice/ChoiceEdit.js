import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
} from "react-admin";

const ChoiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="value" validate={required()} />
      <BooleanInput source="isCorrect" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default ChoiceEdit;
