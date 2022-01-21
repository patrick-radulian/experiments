import { Card } from "@mui/material";
import React from "react";
import MultiSelect, { MultiSelectForwardRef } from "../components/MultiSelect/MultiSelect";
import MultiSelectLabel from "../components/MultiSelect/MultiSelectLabel";
import { dataLarge } from '../data-large';
import { dataShort } from '../data-short';

const Selects = () => {
    const multiSelectRef_A = React.useRef<MultiSelectForwardRef | null>(null);
    const multiSelectRef_B = React.useRef<MultiSelectForwardRef | null>(null);

    return (
        <>
            <Card>
                <MultiSelectLabel htmlFor={multiSelectRef_A}>Group Members (few options)</MultiSelectLabel>
                <MultiSelect options={dataShort} ref={multiSelectRef_A} styles={{width: "20rem"}}/>
            </Card>

            <Card>
                <MultiSelectLabel htmlFor={multiSelectRef_B}>Group Members (many options)</MultiSelectLabel>
                <MultiSelect options={dataLarge} ref={multiSelectRef_B} styles={{width: "20rem"}}/>
            </Card>
        </>
    )
}

export default Selects;