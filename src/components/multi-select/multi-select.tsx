import React from "react";
import multiSelectStyles from "./multi-select.module.css";
import MultiSelectModal from "./multi-select-modal";
import { Chip } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { MultiSelectOption, MultiSelectOptions } from "./multi-select-options";
import { MultiSelectOptionGroups } from "./multi-select-option-groups";

export type MultiSelectForwardRef = {
    handleOpen: () => void
}

export type MultiSelectProps = {
    options: MultiSelectOptions | MultiSelectOptionGroups,
    styles?: React.CSSProperties,
    fullWidth?: boolean
}


const MultiSelect = React.forwardRef<MultiSelectForwardRef, MultiSelectProps>(({options, styles, fullWidth}, ref) => {
    const [open, setOpen] = React.useState(false);
    const [bodyFull, setBodyFull] = React.useState(false);
    const [checkedOptions, setChecked] = React.useState<Set<MultiSelectOption>>(new Set());
    const [numberOfVisibleChips, setNumberOfVisibleChips] = React.useState<number>(0);

    const multiSelectBodyLimiter = React.useRef<HTMLDivElement>(null);
    const chips = React.useRef<Array<HTMLDivElement | null>>([]);
    const totalChipsWidth = React.useRef<number>(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleToggle = (options: MultiSelectOption | Array<MultiSelectOption>) => {
        // const currentIndex = checkedOptions.indexOf(option);
        // const newChecked = [...checkedOptions];

        // if (currentIndex === -1) {
        //     newChecked.push(option);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }

        let newOptions: Array<MultiSelectOption>;
        const newChecked = new Set(checkedOptions);

        if (!Array.isArray(options)) {
            newOptions = Array(options);
        } else {
            newOptions = options;
        }

        for (let option of newOptions) {
            if (newChecked.has(option)) {
                newChecked.delete(option);
            } else {
                newChecked.add(option);
            }
        }

        setChecked(newChecked);
    };





    /**
     * Here we have to use an imperative handle to store a reference to the handleOpen method in the forwardRef
     * object. The handleOpen method is thus exposed to the outside environment which instantiates this
     * <MultiSelect> option. This allows us to pass the method through to the <MultiSelectLabel> component, which
     * is used as a sibling of <MultiSelect> (see App.tsx), which allows us to use handleOpen as a handler for
     * the onClick event on the label that is associated with the <MultiSelect>.
     * This way we can detatch the label from the multiSelect, allowing us to place both elements wherever we want.
     */
    React.useImperativeHandle(ref, () => ({
        handleOpen
    }));





    /**
     * Before we do anything else, we run this side-effect after every render pass, in order to collect
     * the total width of all chips in the select's body (which is equal to the number of checked options).
     */
    React.useEffect(() => {
        totalChipsWidth.current = 0;
        chips.current.forEach(chip => totalChipsWidth.current += chip?.offsetWidth ?? 0);
    });





    /**
     * Next we run this side-effect - but only when checkedOptions changes - which determines whether the select
     * body is overflowing with chips, which means that we need to display the extra badge, indicating how
     * many more options are checked but not actually visible on the screen.
     */
    React.useEffect(() => {
        /**
         * First, calculate the total width occupied by all chips and add the container's flex-gap and margin to the sum.
         * How many times the flex-gap needs to be added depends on the number of rendered chips.
         * Gaps in flex containers are added in between each flex child, so this means the number of gaps to add is
         * equal to (number of chips - 1).
         * Additionally, we add the container's margin twice.
         * In this example, both the flex-gap and container margin are styled with 0.5rem, which equals 8px each.
         * This brings us to the final formula (totalChipsWidth.current + (checkedOptions.length + 1) * 8).
         * This value is then compared with the container's maximum available width for chips.
         */

        if ((totalChipsWidth.current + (checkedOptions.size + 1) * 8) > multiSelectBodyLimiter.current!.offsetWidth) {
            /**
             * If the collective width of chips, gaps and container margin exceed the container's available maximum width
             * for chips, we need to set 'bodyFull' to true to indicate that there are more options checked (and thus chips
             * rendered) than fit the select's body.
             */

            setBodyFull(true);
        } else {
            /**
             * If, however, the chips fit nicely into the select's body, we set 'bodyFull' to false and we don't need to display
             * any indicator for hidden chips.
             */

            setBodyFull(false);
        }


    }, [checkedOptions]);





    /**
     * Lastly, after every(!) render, we run this 3rd side-effect, to find out how many chips are visible on the screen.
     * We do this by iterating over the chips MutableRefObject. This MutableRefObject is an array which contains references
     * to the rendered chips as HTMLDivElements.
     * We check at which index the first chip is positioned, which as an offsetTopValue higher than 0.
     * This means that the chip is breaking into the next line (according to the container's flex-wrap rules).
     * Therefore we can determine how many chips are visible and store that information in the numberOfVisibleChips state
     * variable.
     * This state variable is then ultimately used in the render function below to calculate and show how many chips are
     * hidden from sight, using the formula (checkedOptions.length - numberOfVisibleChips).
     */
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
        <div className={multiSelectStyles.container} style={{...styles, width: fullWidth ? "100%" : "auto"}}>
            <div className={multiSelectStyles["multi-select"]} onClick={handleOpen}>
                <div ref={multiSelectBodyLimiter} className={multiSelectStyles["multi-select-body-limiter"]}>
                    <div className={multiSelectStyles["multi-select-body"]}>
                        {Array.from(checkedOptions).map((option, index) => (
                            <Chip className={multiSelectStyles["multi-select-chip"]} label={option.label} size="medium" key={option.value} ref={el => setChipsRef(el, index)}/>
                        ))}
                    </div>

                    <div className={multiSelectStyles["extras"]}>
                        {bodyFull && <Chip label={`+ ${checkedOptions.size - numberOfVisibleChips}`} size="medium"/>}
                    </div>
                </div>

                <button className={multiSelectStyles["multi-select-expand-button"]}><UnfoldMoreIcon fontSize="medium"/></button>
            </div>

            <MultiSelectModal title="Multi-Select Options" handleClose={handleClose} handleToggle={handleToggle} checkedOptions={checkedOptions} open={open} data={options}/>
        </div>
    )
});

export default MultiSelect;