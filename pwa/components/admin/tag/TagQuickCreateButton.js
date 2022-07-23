import React, { useState } from "react";
import {
  Button,
  Create,
  Form,
  required,
  SaveButton,
  TextInput,
  useCreate,
  useNotify,
} from "react-admin";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconContentAdd from "@mui/icons-material/Add";
import IconCancel from "@mui/icons-material/Cancel";

const TagQuickCreateButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [create, { loading, error }] = useCreate();
  const notify = useNotify();

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const onSubmit = (data) => {
    create("tags", { data });

    if (!error) {
      notify("Tag created successfully");
    } else {
      notify("Error creating tag");
    }

    setShowDialog(false);
  };

  return (
    <>
      <Button onClick={handleClick} label="ra.action.create">
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Create new tag"
      >
        <DialogTitle>Create new tag</DialogTitle>

        <Create resource="tags">
          <Form onSubmit={onSubmit}>
            <DialogContent>
              <TextInput source="name" validate={required()} fullWidth />
            </DialogContent>
            <DialogActions>
              <Button
                label="ra.action.cancel"
                onClick={handleCloseClick}
                disabled={loading}
              >
                <IconCancel />
              </Button>
              <SaveButton />
            </DialogActions>
          </Form>
        </Create>
      </Dialog>
    </>
  );
};

export default TagQuickCreateButton;
