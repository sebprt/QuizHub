import * as React from "react";
import {
  BooleanInput,
  Edit,
  required,
  SimpleForm,
  TextInput,
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
