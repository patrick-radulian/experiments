import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, Grid } from "@mui/material";

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

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {options.map(option => (
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