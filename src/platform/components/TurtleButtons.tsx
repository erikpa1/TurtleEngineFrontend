import React from "react";
import {useTranslation} from "react-i18next";

import Button from "@mui/material/Button";

import {ButtonProps} from "@mui/material/Button/Button";


interface _TurtleButtonProps extends ButtonProps {
    label?: string
}


export function TurtleButton(props: _TurtleButtonProps) {

    const [t] = useTranslation()

    const _label = props.label ? props.label : ""

    return (
        <Button {...props}>
            {t(_label)}
        </Button>
    )
}