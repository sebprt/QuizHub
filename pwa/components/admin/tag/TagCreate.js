import * as React from "react";
import { Create, required, SimpleForm, TextInput } from "react-admin";

const TagCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
    </SimpleForm>
  </Create>
);

export default TagCreate;
