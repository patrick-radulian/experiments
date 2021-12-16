import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import styles from "./MultiSelectModal.module.css";

export interface IMultiSelectModal {
    open: boolean,
    title: string,
    options: Array<{label: string, value: string}>,
    handleClose: () => void
}

export default function MultiSelectModal(props: IMultiSelectModal) {
    const { open, title, options, handleClose } = props;

    const [checked, setChecked] = React.useState<Array<string>>([]);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Dialog className={styles["multi-select-modal"]} open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {options.map(option => (
                        <Grid item xs={4} onClick={handleToggle(option.value)} key={option.value}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={checked.indexOf(option.value) !== -1}
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