import * as React from "react";
import {
  Datagrid,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";

const TagShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="name" />
        <ReferenceField source="category" reference="categories">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab
        label={
          <span>
            Quizzes (
            <span className="badge">
              <NumberField source="quizzes.length" />
            </span>
            )
          </span>
        }
      >
        <ReferenceArrayField label="" reference="quizzes" source="quizzes">
          <Datagrid>
            <TextField source="title" />
            <TextField source="description" />
          </Datagrid>
        </ReferenceArrayField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default TagShow;
