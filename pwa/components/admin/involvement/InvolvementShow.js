import * as React from 'react';
import {
    TextField,
    Show,
    SimpleShowLayout,
    RichTextField, NumberField,
} from 'react-admin';

const InvolvementShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="status"/>
            <NumberField source="score"/>
        </SimpleShowLayout>
    </Show>
)

export default InvolvementShow;
