import * as React from 'react';
import {Edit, SimpleForm, TextInput, required, ReferenceInput, SelectInput} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const QuizEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" validate={required()}/>
            <TextInput source="slug" disabled={true} />
            <RichTextInput source="description" validate={required()}/>
            <ReferenceInput label="Category" source="category" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
)

export default QuizEdit;
