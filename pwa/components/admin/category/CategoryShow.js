import * as React from "react";
import {
  Datagrid,
  NumberField,
  ReferenceArrayField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";

const CategoryShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="name" />
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

export default CategoryShow;
