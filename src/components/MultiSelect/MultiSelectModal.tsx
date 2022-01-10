import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Grid, Switch, FormControlLabel } from "@mui/material";

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

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setUseManyOptions(checked);
        setOptionsToUse(checked ? options.manyOptions : options.fewOptions);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle sx={{display: "flex", justifyContent: "space-between"}}>
                <span>{title}</span>
                <FormControlLabel control={<Switch checked={useManyOptions} onChange={handleSwitch}/>} label="Use Many Options" />
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {optionsToUse.map(option => (
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
                    ))}
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}