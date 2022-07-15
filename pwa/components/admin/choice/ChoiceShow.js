import * as React from "react";
import { TextField, Show, SimpleShowLayout, BooleanField } from "react-admin";

const ChoiceShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="value" />
      <BooleanField source="isCorrect" />
    </SimpleShowLayout>
  </Show>
);

export default ChoiceShow;
