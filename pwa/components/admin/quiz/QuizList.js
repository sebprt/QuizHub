import * as React from "react";
import {
  Datagrid,
  EditButton,
  List,
  RichTextField,
  ShowButton,
  TextField,
} from "react-admin";

const PostList = () => (
  <List>
    <>
      <Datagrid>
        <TextField source="title" />
        <RichTextField source="description" />
        <TextField source="slug" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </>
  </List>
);

export default PostList;
