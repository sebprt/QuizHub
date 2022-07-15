import * as React from "react";
import {
  Edit,
  TabbedForm,
  FormTab,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import TagQuickCreateButton from "../tag/TagQuickCreateButton";

const QuizEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="title" validate={required()} />
        <TextInput source="slug" disabled={true} />
        <RichTextInput source="description" validate={required()} />
        <ReferenceInput
          label="Category"
          source="category"
          reference="categories"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
      </FormTab>
      <FormTab label="Tags">
        <ReferenceArrayInput
          source="tags"
          reference="tags"
          label=""
          validate={required()}
        >
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <TagQuickCreateButton />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default QuizEdit;
