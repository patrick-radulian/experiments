import React from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MultiSelect, { MultiSelectForwardRef } from "components/multi-select/multi-select";
import MultiSelectLabel from "components/multi-select-label/multi-select-label";
import { dataShort } from "mock-data/data-short";
import { priviledges } from "mock-data/priviledges";

type ValidityField = {
    valid: boolean,
    helperText: string
}

type Validity = {
    groupNameA: ValidityField,
    descriptionA: ValidityField,
    groupNameB: ValidityField,
    descriptionB: ValidityField
}

const NewGroupFew = () => {
    const navigate = useNavigate();

    const multiSelectRef_A1 = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_B1 = React.useRef<MultiSelectForwardRef | null>(null);

    const [validity, setValidity] = React.useState<Validity>({
        groupNameA: {valid: true, helperText: ""},
        descriptionA: {valid: true, helperText: ""},
        groupNameB: {valid: true, helperText: ""},
        descriptionB: {valid: true, helperText: ""}
    });

    const handleClose = () => navigate(-1);

    const validationFunction = (field: keyof Validity, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isValid = !event.target.value.includes("$");

        setValidity({
            ...validity,
            [field]: {
                valid: isValid,
                helperText: isValid ? "" : "Here is a little help, buddy"
            }
        });
    }

    return (
        <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create User Group</DialogTitle>

            <DialogContent>
                <Box mb={3}>
                    <InputLabel htmlFor="groupName">Group name</InputLabel>
                    <TextField id="groupName" error={!validity.groupNameA.valid} helperText={validity.groupNameA.helperText} fullWidth onChange={e => validationFunction("groupNameA", e)}/>
                </Box>
                <Box mb={3}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <TextField id="description" error={!validity.descriptionA.valid} helperText={validity.descriptionA.helperText} fullWidth onChange={e => validationFunction("descriptionA", e)}/>
                </Box>
                <Box mb={3}>
                    <MultiSelectLabel htmlFor={multiSelectRef_A1}>Members (few options)</MultiSelectLabel>
                    <MultiSelect options={dataShort} ref={multiSelectRef_A1} fullWidth/>
                </Box>
                <Box mb={3}>
                    <MultiSelectLabel htmlFor={multiSelectRef_B1}>Priviledges</MultiSelectLabel>
                    <MultiSelect options={priviledges} ref={multiSelectRef_B1} fullWidth/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewGroupFew;