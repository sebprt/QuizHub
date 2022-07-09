import * as React from 'react';
import {TextField, Show, TabbedShowLayout, Tab, ReferenceManyField, Datagrid, NumberField} from 'react-admin';

const CategoryShow = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="General">
                <TextField source="name"/>
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

export default CategoryShow;
