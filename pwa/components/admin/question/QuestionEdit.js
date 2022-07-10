import * as React from 'react';
import {Edit, SimpleForm, TextInput, required, ImageInput} from 'react-admin';

const QuestionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" validate={required()}/>
            <TextInput source="difficulty" validate={required()}/>
            <ImageInput source="illustration" validate={required()}/>
        </SimpleForm>
    </Edit>
)

export default QuestionEdit;
