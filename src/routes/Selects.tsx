import { Box, Card, Container, Grid, InputLabel, TextField } from "@mui/material";
import React from "react";
import MultiSelect, { MultiSelectForwardRef } from "../components/MultiSelect/MultiSelect";
import MultiSelectLabel from "../components/MultiSelect/MultiSelectLabel";
import { dataLarge } from "../data-large";
import { dataShort } from "../data-short";

type ValidityField = {
    valid: boolean,
    helperText: string
}

type Validity = {
    groupName: ValidityField,
    description: ValidityField
}

const Selects = () => {
    const multiSelectRef_A = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_B = React.useRef<MultiSelectForwardRef | null>(null);

    const [validity, setValidity] = React.useState<Validity>({groupName: {valid: true, helperText: ""}, description: {valid: true, helperText: ""}});

    const validationFunction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isValid = !event.target.value.includes("$");

        setValidity({
            ...validity,
            [event.target.id]: {
                valid: isValid,
                helperText: isValid ? "" : "Here is a little help, buddy"
            }
        });
    }

    return (
        <Box padding={4}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={12}>
                    <Container maxWidth="sm">
                        <Card sx={{padding: 2}}>
                            <Box my={4}>
                                <InputLabel htmlFor="groupName">Group name</InputLabel>
                                <TextField id="groupName" size="small" error={!validity.groupName.valid} helperText={validity.groupName.helperText} fullWidth onChange={e => validationFunction(e)}/>
                            </Box>
                            <Box my={4}>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <TextField id="description" size="small" error={!validity.description.valid} helperText={validity.description.helperText} fullWidth onChange={e => validationFunction(e)}/>
                            </Box>
                            <Box my={4}>
                                <MultiSelectLabel htmlFor={multiSelectRef_A}>Group Members (few options)</MultiSelectLabel>
                                <MultiSelect options={dataShort} ref={multiSelectRef_A} styles={{width: "20rem"}}/>
                            </Box>
                        </Card>
                    </Container>
                </Grid>

                <Grid item md={6} sm={12}>
                    <Card sx={{width: 500}}>
                        <TextField label="Group Name"/>
                        <TextField label="Description"/>
                        <MultiSelectLabel htmlFor={multiSelectRef_B}>Group Members (many options)</MultiSelectLabel>
                        <MultiSelect options={dataLarge} ref={multiSelectRef_B} styles={{width: "20rem"}}/>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Selects;