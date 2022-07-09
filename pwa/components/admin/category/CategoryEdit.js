import * as React from 'react';
import {Edit, SimpleForm, TextInput, required} from 'react-admin';

const CategoryEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" validate={required()}/>
        </SimpleForm>
    </Edit>
)

export default CategoryEdit;
