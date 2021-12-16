import React from "react";
import styles from "./MultiSelect.module.css";
import MultiSelectModal from "./MultiSelectModal";
import { data } from "./data";
import { Chip } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function MultiSelect() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles["multi-select"]} onClick={handleClickOpen}>
                <div className={styles["multi-select-body"]}>
                    <Chip className={styles["multi-select-chip"]} label="A selected option" size="small"/>
                    <Chip className={styles["multi-select-chip"]} label="Another selected option" size="small"/>
                </div>

                <button className={styles["multi-select-expand-button"]}><UnfoldMoreIcon fontSize="medium"/></button>
            </div>

            <MultiSelectModal title="Multi-Select Options" handleClose={handleClose} open={open} options={data}/>
        </>
    )
}