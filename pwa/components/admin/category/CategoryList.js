import * as React from 'react';
import {
    Datagrid,
    TextField,
    List,
    ShowButton,
    EditButton,
} from 'react-admin';

const CategoryList = () => (
    <List>
        <>
            <Datagrid>
                <TextField source="name" />
                <ShowButton />
                <EditButton />
            </Datagrid>
        </>
    </List>
)

export default CategoryList;
