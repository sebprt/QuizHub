import * as React from 'react';
import {Create, TabbedForm, FormTab, TextInput, required, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import QuestionQuickCreateButton from "../question/QuestionQuickCreateButton";

const QuizCreate = () => (
    <Create>
        <TabbedForm>
            <FormTab label="General">
                <TextInput source="title" validate={required()}/>
                <RichTextInput source="description" validate={required()}/>
                <ReferenceInput label="Category" source="category" reference="categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </FormTab>
            <FormTab label="Questions">
                <ReferenceArrayInput source="questions" reference="questions" label="" validate={required()}>
                    <SelectArrayInput optionText="title" />
                </ReferenceArrayInput>
                <QuestionQuickCreateButton />
            </FormTab>
            <FormTab label="Tags">
                <ReferenceArrayInput source="tags" reference="tags" label="" validate={required()}>
                    <SelectArrayInput optionText="name" />
                </ReferenceArrayInput>
            </FormTab>
        </TabbedForm>
    </Create>
)

export default QuizCreate;
