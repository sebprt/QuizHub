import * as React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  required,
  ReferenceInput,
  useDataProvider,
  useRedirect,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ArrayInput,
  SimpleFormIterator,
  ImageInput,
  BooleanInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import TagQuickCreateButton from "../tag/TagQuickCreateButton";

const QuizCreate = () => {
  const dataProvider = useDataProvider();
  const redirect = useRedirect();

  const onSubmit = (data) => {
    dataProvider
      .create("quizzes", {
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          tags: data.tags,
          createdBy: "/users/18",
        },
      })
      .then(({ data: response }) => {
        if (data.questions.length > 0) {
          data.questions.forEach((question) => {
            dataProvider
              .create("questions", {
                data: {
                  quiz: response.id,
                  ...question,
                },
              })
              .then(({ data: response }) => {
                if (question.choices.length > 0) {
                  question.choices.forEach((choice) => {
                    dataProvider
                      .create("choices", {
                        data: {
                          question: response.id,
                          ...choice,
                        },
                      })
                      .then(({ data }) => {
                        // console.log(data);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    redirect("list", "/quizzes");
  };

  return (
    <Create>
      <TabbedForm onSubmit={onSubmit}>
        <FormTab label="General">
          <TextInput source="title" validate={required()} />
          <RichTextInput source="description" validate={required()} />
          <ReferenceInput
            label="Category"
            source="category"
            reference="categories"
            validate={required()}
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Questions">
          <ArrayInput source="questions" label="">
            <SimpleFormIterator>
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
              <ImageInput source="illustration" />
              <ArrayInput source="choices">
                <SimpleFormIterator>
                  <TextInput source="value" validate={required()} />
                  <BooleanInput source="isCorrect" validate={required()} />
                </SimpleFormIterator>
              </ArrayInput>
            </SimpleFormIterator>
          </ArrayInput>
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
    </Create>
  );
};

export default QuizCreate;
