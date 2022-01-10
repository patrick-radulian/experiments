import React from "react";
import styles from "./MultiSelect.module.css";
import MultiSelectModal, { IMultiSelectOption } from "./MultiSelectModal";
import { data } from "./data-short";
import { Chip } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function MultiSelect() {
    const [open, setOpen] = React.useState(false);
    const [bodyFull, setBodyFull] = React.useState(false);
    const [checkedOptions, setChecked] = React.useState<Array<IMultiSelectOption>>([]);
    const [numberOfVisibleChips, setNumberOfVisibleChips] = React.useState<number>(0);

    const multiSelectBodyLimiter = React.useRef<HTMLDivElement>(null);
    const chips = React.useRef<Array<HTMLDivElement | null>>([]);
    const totalChipsWidth = React.useRef<number>(0);

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
        totalChipsWidth.current = 0;
        chips.current.forEach(chip => totalChipsWidth.current += chip?.offsetWidth ?? 0);
    });





    /* Everytime we check an option and thus upgrade the checkedOptions array, we need to run this effect. */
    React.useEffect(() => {
        /*
         * First, we want to compare the height of multiSelectBody and multiSelectBodyHeight.
         *
         * At this point, multiSelectBody (which contains all the chip elements representing checked options)
         * has potentially grown in height, because it uses flex-wrap: wrap. This means that new Chip elements,
         * which exceed the available horizontal space, will wrap around into a new line, causing multiSelectBody
         * to grow vertically (even if we do not see it in the UI due to overflow: hidden).
         *
         * MultiSelectBodyHeight is a RefObject, which still contains multiSelectBody's original height, when it
         * was only one line tall.
         */

        // if (!((multiSelectBody.current?.scrollHeight! + 16) > multiSelectBodyHeight.current!)) {
        if (!((totalChipsWidth.current + (checkedOptions.length + 1) * 8) > multiSelectBodyLimiter.current!.offsetWidth)) {
            /*
             * If multiSelectBody has not yet grown vertically taller than its original height value, we can safely
             * increase the counter for numberOfDisplayedOptions (which keeps track of how many Chip elements are
             * really visible).
             * Additionally, we need to make sure that bodyFull remains or is set to "false" at this point, otherwise
             * the "additional options counter" element would already start appearing before Chips start wrapping around.
             */

            // numberOfDisplayedOptions.current = checkedOptions.length;
            setBodyFull(false);
        } else {
            /*
             * If, however, multiSelectBody's height has grown...which means that Chip elements have started wrapping
             * around into a new line...we need to set bodyFull to "true" in order to show the "additional options counter"
             * element.
             */

            setBodyFull(true);
        }


    }, [checkedOptions]);





    React.useEffect(() => {
        if (!bodyFull) return;

        chips.current.forEach((chip, index) => {
            if (!chip || chip.offsetTop > 0) return;
            setNumberOfVisibleChips(index + 1);
        });
    });





    const setChipsRef = (chip: HTMLDivElement | null, index: number) => {
        chips.current[index] = chip;
    }


    return (
        <div className={styles.container}>
            <label className={styles["multi-select-label"]}>Group members</label>

            <div className={styles["multi-select"]} onClick={handleClickOpen}>
                <div ref={multiSelectBodyLimiter} className={styles["multi-select-body-limiter"]}>
                    <div className={styles["multi-select-body"]}>
                        {checkedOptions.map((option, index) => (
                            <Chip className={styles["multi-select-chip"]} label={option.label} size="small" key={option.value} ref={el => setChipsRef(el, index)}/>
                        ))}
                    </div>

                    <div className={styles["extras"]}>
                        {bodyFull && <Chip label={`+ ${checkedOptions.length - numberOfVisibleChips}`} size="small"/>}
                    </div>
                </div>

                <button className={styles["multi-select-expand-button"]}><UnfoldMoreIcon fontSize="medium"/></button>
            </div>

            <MultiSelectModal title="Multi-Select Options" handleClose={handleClose} handleToggle={handleToggle} checkedOptions={checkedOptions} open={open} options={data}/>
        </div>
    )
}