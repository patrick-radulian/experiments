import { Box, Card, Container, Grid, InputLabel, TextField } from "@mui/material";
import React from "react";
import MultiSelect, { MultiSelectForwardRef } from "../../components/multi-select/multi-select";
import MultiSelectLabel from "../../components/multi-select/multi-select-label";
import { MultiSelectOptions } from "../../components/multi-select/multi-select-options";
import { dataLarge } from "../../mock-data/data-large";
import { dataShort } from "../../mock-data/data-short";
import { priviledges } from "../../mock-data/priviledges";

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

const Selects = () => {
    const multiSelectRef_A1 = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_B1 = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_A2 = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_B2 = React.useRef<MultiSelectForwardRef | null>(null);

    const asdf = new MultiSelectOptions([{label: "asdf", value: "qwer"}]);

    const [validity, setValidity] = React.useState<Validity>({
        groupNameA: {valid: true, helperText: ""},
        descriptionA: {valid: true, helperText: ""},
        groupNameB: {valid: true, helperText: ""},
        descriptionB: {valid: true, helperText: ""}
    });

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

    console.log(priviledges);

    return (
        <Box padding={4}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={12}>
                    <Container maxWidth="sm">
                        <Card sx={{padding: 2}} >
                            <Box mb={3}>
                                <InputLabel htmlFor="groupName">Group name</InputLabel>
                                <TextField id="groupName" size="small" error={!validity.groupNameA.valid} helperText={validity.groupNameA.helperText} fullWidth onChange={e => validationFunction("groupNameA", e)}/>
                            </Box>
                            <Box mb={3}>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <TextField id="description" size="small" error={!validity.descriptionA.valid} helperText={validity.descriptionA.helperText} fullWidth onChange={e => validationFunction("descriptionA", e)}/>
                            </Box>
                            <Box mb={3}>
                                <MultiSelectLabel htmlFor={multiSelectRef_A1}>Members (few options)</MultiSelectLabel>
                                <MultiSelect options={dataShort} ref={multiSelectRef_A1} styles={{width: "20rem"}}/>
                            </Box>
                            <Box mb={3}>
                                <MultiSelectLabel htmlFor={multiSelectRef_B1}>Priviledges</MultiSelectLabel>
                                <MultiSelect options={priviledges} ref={multiSelectRef_B1} styles={{width: "20rem"}}/>
                            </Box>
                        </Card>
                    </Container>
                </Grid>

                <Grid item md={6} sm={12}>
                    <Card sx={{width: 500}}>
                        <TextField label="Group Name"/>
                        <TextField label="Description"/>
                        <MultiSelectLabel htmlFor={multiSelectRef_A2}>Members (many options)</MultiSelectLabel>
                        <MultiSelect options={dataLarge} ref={multiSelectRef_A2} styles={{width: "20rem"}}/>
                        <MultiSelectLabel htmlFor={multiSelectRef_B2}>Priviledges</MultiSelectLabel>
                        <MultiSelect options={asdf} ref={multiSelectRef_B2} styles={{width: "20rem"}}/>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Selects;