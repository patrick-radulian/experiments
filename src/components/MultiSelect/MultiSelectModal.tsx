import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Grid, FormControlLabel, TextField, Box, InputAdornment, IconButton, Container } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from '@mui/icons-material/Close';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export interface IMultiSelectOption {
    label: string,
    value: string
}

export interface IMultiSelectModal {
    open: boolean,
    title: string,
    options: Array<IMultiSelectOption>,
    checkedOptions: Array<IMultiSelectOption>,
    handleToggle: (option: IMultiSelectOption) => void,
    handleClose: () => void
}

export default function MultiSelectModal(props: IMultiSelectModal) {
    const { open, title, options, checkedOptions, handleToggle, handleClose } = props;

    const onChange = (option: IMultiSelectOption) => () => handleToggle(option);

    const [optionsFilterValue, setOptionsFilterValue] = React.useState<string>("");
    const [filteredOptions, setFilteredOptions] = React.useState<Array<IMultiSelectOption>>([]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOptionsFilterValue(event.target.value);
    }

    const FilterFieldAdornment = () => {
        return (
            <>
                {optionsFilterValue.length > 0 ? (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setOptionsFilterValue("")}>
                            <ClearIcon/>
                        </IconButton>
                    </InputAdornment>
                ) : (
                    null
                )}
            </>
        )
    }

    React.useEffect(() => {
        setFilteredOptions(() => options.filter(option => option.label.toLowerCase().includes(optionsFilterValue.toLowerCase())));
    }, [optionsFilterValue, options]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle sx={{display: "flex", justifyContent: "space-between"}}>
                <span>{title}</span>
                <IconButton onClick={handleClose}><CloseIcon/></IconButton>
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