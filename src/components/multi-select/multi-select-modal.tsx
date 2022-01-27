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
import { MultiSelectOptions, MultiSelectOption } from "./multi-select-options";
import { MultiSelectGroups, MultiSelectOptionGroups } from "./multi-select-option-groups";



export type MultiSelectModalProps = {
    open: boolean,
    title: string,
    data: MultiSelectOptions | MultiSelectOptionGroups,
    checkedOptions: Array<MultiSelectOption>,
    handleToggle: (option: MultiSelectOption) => void,
    handleClose: () => void
}

export default function MultiSelectModal(props: MultiSelectModalProps) {
    const { open, title, data, checkedOptions, handleToggle, handleClose } = props;

    const onChange = (option: MultiSelectOption) => () => handleToggle(option);

    const filterData = React.useRef((data: MultiSelectOptionGroups | MultiSelectOptions) => {
        if (data instanceof MultiSelectOptions) {
            let newOptions = new MultiSelectOptions(data.getOptions().filter(option => option.label.toLowerCase().includes(optionsFilterValue.toLowerCase())));

            return newOptions;
        } else {
            let filteredGroups: MultiSelectGroups = [];

            data.getOptionGroups().forEach(group => {
                let filteredOptions = group.options.filter(option => option.label.toLowerCase().includes(optionsFilterValue.toLowerCase()));

                if (filteredOptions.length > 0) {
                    filteredGroups.push({
                        label: group.label,
                        options: filteredOptions
                    })
                }
            });

            let newGroups = new MultiSelectOptionGroups(filteredGroups);

            return newGroups;
        }
    });

    const [optionsFilterValue, setOptionsFilterValue] = React.useState<string>("");
    const [filteredOptions, setFilteredOptions] = React.useState<MultiSelectOptions | MultiSelectOptionGroups>(filterData.current(data));

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
        setFilteredOptions(filterData.current(data));
    }, [optionsFilterValue, data]);

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

                <Grid container spacing={2} >
                    {filteredOptions instanceof MultiSelectOptionGroups ? (
                        filteredOptions.getOptionGroups().length > 0 ? (
                            filteredOptions.getOptionGroups().map(group => (
                                <React.Fragment key={group.label}>
                                    <Grid item xs={4}>{group.label}</Grid>

                                    {group.options.map(option => (
                                        <Grid item xs={4} key={option.value} sx={{paddingLeft: 4}}>
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
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <Container fixed sx={{display: "flex", flexDirection: "column", alignItems: "center", p: "1rem", fontSize: "1.15rem", opacity: 0.7}} >
                                <span>No matching options</span>
                                <SentimentDissatisfiedIcon fontSize="large" sx={{mt: "1rem"}}/>
                            </Container>
                        )
                    ) : (
                        filteredOptions.getOptions().length > 0 ? (
                            filteredOptions.getOptions().map(option => (
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
                        )
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