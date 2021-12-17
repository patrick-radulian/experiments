import React from "react";
import styles from "./MultiSelect.module.css";
import MultiSelectModal, { IMultiSelectOption } from "./MultiSelectModal";
import { data } from "./data";
import { Chip } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function MultiSelect() {
    const [open, setOpen] = React.useState(false);
    const [bodyFull, setBodyFull] = React.useState(false);
    const [checkedOptions, setChecked] = React.useState<Array<IMultiSelectOption>>([]);

    const multiSelect = React.createRef<HTMLDivElement>();
    const multiSelectBody = React.createRef<HTMLDivElement>();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleToggle = (option: IMultiSelectOption) => {
        const currentIndex = checkedOptions.indexOf(option);
        const newChecked = [...checkedOptions];

        if (currentIndex === -1) {
            newChecked.push(option);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    React.useEffect(() => {
        if (!multiSelectBody.current || !multiSelect.current) return;
        setBodyFull((multiSelectBody.current.offsetWidth + 38) > multiSelect.current.clientWidth);
    }, [open]);

    return (
        <div className={styles.container}>
            <label className={styles["multi-select-label"]}>Group members</label>

            <div ref={multiSelect} className={styles["multi-select"]} onClick={handleClickOpen}>
                <div ref={multiSelectBody} className={styles["multi-select-body"]}>
                    {bodyFull ? (
                        <Chip className={styles["multi-select-chip"]} label="Multiple Options Selected" size="small"/>
                    ) : (
                        checkedOptions.map(option => (
                            <Chip className={styles["multi-select-chip"]} label={option.label} size="small" key={option.value}/>
                        ))
                    )}
                </div>

                <button className={styles["multi-select-expand-button"]}><UnfoldMoreIcon fontSize="medium"/></button>
            </div>

            <MultiSelectModal title="Multi-Select Options" handleClose={handleClose} handleToggle={handleToggle} checkedOptions={checkedOptions} open={open} options={data}/>
        </div>
    )
}