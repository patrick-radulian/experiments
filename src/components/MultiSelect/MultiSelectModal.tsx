import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Grid, Switch, FormControlLabel, TextField, Box, InputAdornment, IconButton, Container } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export interface IMultiSelectOption {
    label: string,
    value: string
}

export interface IOptions {
    fewOptions: Array<IMultiSelectOption>,
    manyOptions: Array<IMultiSelectOption>
}

export interface IMultiSelectModal {
    open: boolean,
    title: string,
    options: IOptions,
    checkedOptions: Array<IMultiSelectOption>,
    handleToggle: (option: IMultiSelectOption) => void,
    handleClose: () => void
}

export default function MultiSelectModal(props: IMultiSelectModal) {
    const { open, title, options, checkedOptions, handleToggle, handleClose } = props;

    const onChange = (option: IMultiSelectOption) => () => handleToggle(option);

    const [useManyOptions, setUseManyOptions] = React.useState<boolean>(false);
    const [optionsToUse, setOptionsToUse] = React.useState<Array<IMultiSelectOption>>(options.fewOptions);
    const [optionsFilterValue, setOptionsFilterValue] = React.useState<string>("");
    const [filteredOptions, setFilteredOptions] = React.useState<Array<IMultiSelectOption>>([]);

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setUseManyOptions(checked);
        setOptionsToUse(checked ? options.manyOptions : options.fewOptions);
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptionsFilterValue(event.target.value);
    }

    const FilterFieldAdornment = () => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={() => setOptionsFilterValue("")}>
                    <ClearIcon/>
                </IconButton>
            </InputAdornment>
        )
    }

    React.useEffect(() => {
        setFilteredOptions(() => optionsToUse.filter(option => option.label.toLowerCase().includes(optionsFilterValue.toLowerCase())));
    }, [optionsFilterValue, optionsToUse]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle sx={{display: "flex", justifyContent: "space-between"}}>
                <span>{title}</span>
                <FormControlLabel control={<Switch checked={useManyOptions} onChange={handleSwitch}/>} label="Use Many Options" />
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{marginBottom: "1rem"}}>
                    <TextField fullWidth value={optionsFilterValue} onChange={handleFilterChange} label="Filter Options" variant="outlined" InputProps={{endAdornment: <FilterFieldAdornment/>}} />
                </Box>

                <Grid container spacing={2}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <Grid item xs={4} key={option.value}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checkedOptions.indexOf(option) !== -1}
                                            onChange={onChange(option)}
                                            tabIndex={-1}
                                            name={option.value}
                                            disableRipple
                                        />
                                    }
                                    label={option.label}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Container fixed sx={{display: "flex", flexDirection: "column", alignItems: "center", p: "1rem", fontSize: "1.15rem", opacity: 0.7}} >
                            <span>No matching options</span>
                            <SentimentDissatisfiedIcon fontSize="large" sx={{mt: "1rem"}}/>
                        </Container>
                    )}
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}