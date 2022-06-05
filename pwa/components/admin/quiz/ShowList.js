import * as React from 'react';
import {
    TextField,
    Show,
    SimpleShowLayout,
    RichTextField,
    NumberField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField
} from 'react-admin';

const ShowList = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title"/>
            <RichTextField source="description"/>
            <TextField source="slug"/>
            <NumberField source="numberOfQuestions"/>
            <ReferenceArrayField label="Tags" reference="tags" source="tags">
                <SingleFieldList>
                    <ChipField source="name"/>
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>
)

export default ShowList;
