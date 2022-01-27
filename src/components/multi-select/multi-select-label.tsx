import React from 'react';
import { MultiSelectForwardRef } from './multi-select';

type MultiSelectLabelProps = {
    children: React.ReactChild | React.ReactChildren
    htmlFor: React.RefObject<MultiSelectForwardRef | null>
}

const MultiSelectLabel = ({children, htmlFor}: MultiSelectLabelProps) => {
    const onClick = () => htmlFor.current?.handleOpen();

    return (
        <label onClick={onClick}>
            {children}
        </label>
    )
}

export default MultiSelectLabel;