import * as React from "react";
import {
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  RichTextField,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  Datagrid,
  ShowButton,
  EditButton,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import QuestionQuickCreateButton from "../question/QuestionQuickCreateButton";

const QuizShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="General">
        <TextField source="title" />
        <RichTextField source="description" />
        <TextField source="slug" />
        <ReferenceField source="createdBy" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <ReferenceField source="category" reference="categories">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab
        label={
          <span>
            Questions (
            <span className="badge">
              <NumberField source="questions.length" />
            </span>
            )
          </span>
        }
      >
        <ReferenceArrayField label="" reference="questions" source="questions">
          <Datagrid>
            <TextField source="title" />
            <TextField source="difficulty" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceArrayField>
        <QuestionQuickCreateButton />
      </Tab>
      <Tab
        label={
          <span>
            Tags (
            <span className="badge">
              <NumberField source="tags.length" />
            </span>
            )
          </span>
        }
      >
        <ReferenceArrayField label="" reference="tags" source="tags">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default QuizShow;
