import * as React from 'react';
import {
    TextField,
    Show,
    TabbedShowLayout,
    Tab,
    NumberField,
    Datagrid,
    ReferenceManyField,
    ReferenceField
} from 'react-admin';

const TagShow = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="General">
                <TextField source="name"/>
                <ReferenceField source="category" reference="categories">
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
            <Tab label={<span>Quizzes (<span className="badge"><NumberField source="quizzes.length"/></span>)</span>}>
                <ReferenceManyField label="" reference="quizzes" target="quizzes">
                    <Datagrid>
                        <TextField source="title" />
                        <TextField source="description" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)

export default TagShow;
