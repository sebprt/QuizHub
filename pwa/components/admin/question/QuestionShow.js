import * as React from "react";
import {
  Datagrid,
  EditButton,
  ImageField,
  NumberField,
  ReferenceArrayField,
  Show,
  ShowButton,
  Tab,
  TabbedShowLayout,
  TextField,
} from "react-admin";

const QuestionShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="name" />
        <TextField source="difficulty" />
        <ImageField source="illustration" />
      </Tab>
      <Tab
        label={
          <span>
            Choices (
            <span className="badge">
              <NumberField source="choices.length" />
            </span>
            )
          </span>
        }
      >
        <ReferenceArrayField label="" reference="choices" source="choices">
          <Datagrid>
            <TextField source="value" />
            <TextField source="isCorrect" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceArrayField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default QuestionShow;
