import React, { useState } from 'react';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    Form,
    useCreate,
    ImageInput,
    SelectInput,
} from 'react-admin';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const QuestionQuickCreateButton = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [create, { loading }] = useCreate('questions');
    // const notify = useNotify();

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    return (
        <>
            <Button onClick={handleClick} label="ra.action.create">
                {/*<IconContentAdd />*/}
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label="Create question"
            >
                <DialogTitle>Create question</DialogTitle>

                <Form resource="questions">
                    <DialogContent>
                        <TextInput
                            source="title"
                            validate={required()}
                            fullWidth
                        />
                        <SelectInput
                            source="difficulty"
                            choices={[
                                { id: 'easy', name: 'Easy' },
                                { id: 'medium', name: 'Medium' },
                                { id: 'hard', name: 'Hard' },
                            ]}
                            validate={required()}
                            fullWidth
                        />
                        <ImageInput source="illustration" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            label="ra.action.cancel"
                            onClick={handleCloseClick}
                            disabled={loading}
                        >
                            {/*<IconCancel />*/}
                        </Button>
                        <SaveButton resource="questions" />
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
}

export default QuestionQuickCreateButton;