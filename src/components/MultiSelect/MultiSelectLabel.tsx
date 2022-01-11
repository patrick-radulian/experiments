import React from 'react';

type MultiSelectLabelProps = {
    children: React.ReactChild | React.ReactChildren
    multiSelect: React.RefObject<HTMLDivElement | null>
}

const MultiSelectLabel = ({children, multiSelect}: MultiSelectLabelProps) => {
    const onClick = () => {
        console.log("click")
    }

    return (
        <label onClick={onClick}>
            {children}
        </label>
    )
}

export default MultiSelectLabel;