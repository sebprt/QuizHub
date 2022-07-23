import * as React from "react";
import { BooleanField, Show, SimpleShowLayout, TextField } from "react-admin";

const ChoiceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="value" />
      <BooleanField source="isCorrect" />
    </SimpleShowLayout>
  </Show>
);

export default ChoiceShow;
