import React from "react";

import {useTranslation} from "react-i18next";


import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";


interface TurtleTextFieldProps {
    name: string
}

export function TurtleTextField(props: TextFieldProps): JSX.Element {

    const [t] = useTranslation()

    const _label: string = props.label ? props.label as string : ""

    return (
        <TextField
            className={"turtle-shaded-button"}
            {...props}
            label={t(_label)}
        />
    )
}