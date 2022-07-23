import * as React from "react";
import {
  Edit,
  ImageInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const QuestionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <SelectInput
        source="difficulty"
        choices={[
          { id: "easy", name: "Easy" },
          { id: "medium", name: "Medium" },
          { id: "hard", name: "hard" },
        ]}
        validate={required()}
      />
      <ImageInput source="illustration" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default QuestionEdit;
