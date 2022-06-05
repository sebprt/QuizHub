import * as React from 'react';
import { Datagrid, TextField, List, RichTextField, NumberField, ReferenceArrayField, SingleFieldList, ChipField, ShowButton } from 'react-admin';

const PostList = () => (
    <List>
        <>
            <Datagrid>
                <TextField source="title" />
                <RichTextField source="description" />
                <TextField source="slug" />
                <NumberField source="numberOfQuestions" />
                <ReferenceArrayField label="Tags" reference="tags" source="tags">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <ShowButton />
            </Datagrid>
        </>
    </List>
)

export default PostList;
