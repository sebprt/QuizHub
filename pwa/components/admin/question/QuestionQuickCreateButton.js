import React, { useState } from "react";
import {
  required,
  Button,
  SaveButton,
  TextInput,
  Form,
  useCreate,
  useNotify,
  useRecordContext,
  ImageInput,
  SelectInput,
  Create,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  useDataProvider,
} from "react-admin";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconContentAdd from "@mui/icons-material/Add";
import IconCancel from "@mui/icons-material/Cancel";

const QuestionQuickCreateButton = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const onSubmit = (data) => {
    dataProvider
      .create("questions", {
        data: {
          quiz: record.id,
          ...data,
        },
      })
      .then(({ data: response }) => {
        if (data.choices.length > 0) {
          data.choices.forEach((choice) => {
            dataProvider
              .create("choices", {
                data: {
                  question: response.id,
                  ...choice,
                },
              })
              .then(({ data: response }) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setShowDialog(false);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        label="ra.action.create"
        variant="contained"
      >
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Create new question"
      >
        <DialogTitle>Create new question</DialogTitle>

        <Create resource="questions">
          <Form onSubmit={onSubmit}>
            <DialogContent>
              <TextInput source="title" validate={required()} fullWidth />
              <SelectInput
                source="difficulty"
                choices={[
                  { id: "easy", name: "Easy" },
                  { id: "medium", name: "Medium" },
                  { id: "hard", name: "hard" },
                ]}
                validate={required()}
              />
              <ImageInput source="illustration" />
              <ArrayInput source="choices">
                <SimpleFormIterator>
                  <TextInput source="value" validate={required()} />
                  <BooleanInput source="isCorrect" validate={required()} />
                </SimpleFormIterator>
              </ArrayInput>
            </DialogContent>
            <DialogActions>
              <Button label="ra.action.cancel" onClick={handleCloseClick}>
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

export default QuestionQuickCreateButton;
