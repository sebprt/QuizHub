import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";

const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="username" />
      <TextField source="email" />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
