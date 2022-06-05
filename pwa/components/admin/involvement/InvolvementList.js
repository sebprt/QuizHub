import * as React from 'react';
import { Datagrid, TextField, List, DateField, NumberField, ReferenceField, SingleFieldList, ChipField } from 'react-admin';

const InvolvementList = () => (
    <List>
        <>
            <Datagrid>
                <TextField source="status" />
                <NumberField source="score" />
                <DateField source="startedAt" locales="fr-FR" showTime />
                <DateField source="finishedAt" locales="fr-FR" showTime />
                <ReferenceField label="Quiz" source="quiz" reference="quizzes">
                    <TextField source="title" />
                </ReferenceField>
                <ReferenceField label="User" source="user" reference="users">
                    <TextField source="email" />
                </ReferenceField>
            </Datagrid>
        </>
    </List>
)

export default InvolvementList;
