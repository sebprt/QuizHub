import * as React from 'react';
import {
    TextField,
    Show,
    TabbedShowLayout,
    Tab,
    RichTextField,
    NumberField,
    ReferenceManyField,
    ReferenceField,
    Datagrid, ShowButton, EditButton
} from 'react-admin';

const QuizShow = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="General">
                <TextField source="title"/>
                <RichTextField source="description"/>
                <TextField source="slug"/>
                <ReferenceField source="createdBy" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <ReferenceField source="category" reference="categories">
                    <TextField source="name" />
                </ReferenceField>
            </Tab>
           <Tab label={<span>Questions (<span className="badge"><NumberField source="questions.length"/></span>)</span>}>
                <ReferenceManyField label="" reference="questions" target="questions">
                    <Datagrid>
                        <TextField source="title" />
                        <TextField source="difficulty" />
                        <ShowButton />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            // create a tab for tags
            <Tab label={<span>Tags (<span className="badge"><NumberField source="tags.length"/></span>)</span>}>
                <ReferenceManyField label="" reference="tags" target="tags">
                    <Datagrid>
                        <TextField source="name" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)

export default QuizShow;
