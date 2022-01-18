import React from 'react';

type MultiSelectLabelProps = {
    children: React.ReactChild | React.ReactChildren
    htmlFor: React.RefObject<HTMLDivElement | null>
}

const MultiSelectLabel = ({children, htmlFor}: MultiSelectLabelProps) => {
    const onClick = () => htmlFor.current?.click();

    return (
        <label onClick={onClick}>
            {children}
        </label>
    )
}

export default MultiSelectLabel;