import * as React from "react";
import { Edit, required, SimpleForm, TextInput } from "react-admin";

const TagEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default TagEdit;
