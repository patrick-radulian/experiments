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
    const [displayedOptions, setDisplayedOptions] = React.useState<Array<IMultiSelectOption>>([]);

    const multiSelect = React.useRef<HTMLDivElement>(null);
    const multiSelectBodyLimiter = React.useRef<HTMLDivElement>(null);
    const multiSelectBody = React.useRef<HTMLDivElement>(null);

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
        setDisplayedOptions(newChecked);
    };

    const isBodyOverflowing = React.useCallback(() => {
        return (multiSelectBody!.current!.clientWidth) > (multiSelect!.current!.clientWidth - 38);
    }, []);

    React.useEffect(() => {
        console.log("Running side effect 1");

        if (open) return
        if (!multiSelectBody.current || !multiSelect.current) return;

        setBodyFull(isBodyOverflowing());
    }, [open, isBodyOverflowing]);

    React.useEffect(() => {
        console.log("Running side effect 2");

        // if (!isBodyOverflowing()) return;

        // setDisplayedOptions(prevOptions => {
        //     let newOptions: Array<IMultiSelectOption> = prevOptions;

        //     newOptions.splice(prevOptions.length - 2, 1);

        //     return newOptions;
        // });

        /* if (!multiSelectBody.current || !multiSelect.current) return;

        if (!((multiSelectBody.current?.clientWidth + 16) > (multiSelect.current?.clientWidth - 38))) return

        setDisplayedOptions(prevOptions => {
            // Get the array of previously displayed options
            let newOptions: Array<IMultiSelectOption> = prevOptions;

            // Set the spliceIndex (which we need soon) to the last available index of newOptions
            let spliceIndex: number = prevOptions.length - 2;

            // Now check if we already display the "+ X" chip (because the select body contains too many chips)
            if (isBodyFull) {
                // If so, we need to move the spliceIndex forward by 1 spot so we do not remove the "+ X" chip (which will be added to the array soon)
                spliceIndex = prevOptions.length - 2;

                // Now it's time to add the "+ X" chip to the newOptions array
                newOptions = [
                    ...newOptions,
                    {
                        label: "+ X",
                        value: "SomeUUID"
                    }
                ]
            }

            // Lastly we splice the newOptions array and remove the last (or 2nd last) item, accordingly
            newOptions.splice(spliceIndex, 1);

            return newOptions;
        });

        setBodyFull(isBodyFull); */
    }, [bodyFull, isBodyOverflowing]);

    return (
        <div className={styles.container}>
            <label className={styles["multi-select-label"]}>Group members</label>

            <div ref={multiSelect} className={styles["multi-select"]} onClick={handleClickOpen}>
                <div ref={multiSelectBodyLimiter} className={styles["multi-select-body-limiter"]}>
                    <div ref={multiSelectBody} className={styles["multi-select-body"]}>
                        {displayedOptions.map(option => (
                            <Chip className={styles["multi-select-chip"]} label={option.label} size="small" key={option.value}/>
                        ))}
                    </div>
                </div>

                <div className={styles["extras"]}>
                    {bodyFull && <Chip label={`+ ${checkedOptions.length}`} size="small"/>}
                </div>

                <button className={styles["multi-select-expand-button"]}><UnfoldMoreIcon fontSize="medium"/></button>
            </div>

            <MultiSelectModal title="Multi-Select Options" handleClose={handleClose} handleToggle={handleToggle} checkedOptions={checkedOptions} open={open} options={data}/>
        </div>
    )
}