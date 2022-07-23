import * as React from "react";
import { Datagrid, EditButton, List, ShowButton, TextField } from "react-admin";

const CategoryList = () => (
  <List>
    <>
      <Datagrid>
        <TextField source="name" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </>
  </List>
);

export default CategoryList;
