import React from 'react';
import { MultiSelectForwardRef } from './MultiSelect';

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