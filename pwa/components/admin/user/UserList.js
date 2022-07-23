import * as React from "react";
import { Datagrid, List, ShowButton, TextField } from "react-admin";

const PostList = () => (
  <List hasCreate={false}>
    <>
      <Datagrid>
        <TextField source="firstname" />
        <TextField source="lastname" />
        <TextField source="username" />
        <TextField source="email" />
        <ShowButton />
      </Datagrid>
    </>
  </List>
);

export default PostList;
