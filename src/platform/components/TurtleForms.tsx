import React from "react";

import {useTranslation} from "react-i18next";


import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {TGui} from "@external/tgui";
import {Form} from "react-bootstrap";


interface TurtleTextFieldProps {
    name: string
}

export function TurtleTextField(props: TextFieldProps | any): JSX.Element {

    const [t] = useTranslation()

    const _label: string = props.label ? props.label as string : ""

    return (
        <TextField
            className={props.disabled ? "" : "turtle-shaded-button"}
            {...props}
            label={t(_label)}
        />
    )
}

interface TurtleSingleFileInput {
    name: string
    accept: string
}


export function TurtleSingleFileInput(props: TurtleSingleFileInput | any): JSX.Element {


    const fileInputRef = React.useRef();

    const [t] = useTranslation()

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        // Handle the selected file here
        console.log(file);
    }

    function handleButtonClick() {
        // Trigger the file input dialog when the button is clicked
        fileInputRef.current.click();
    };


    const _label: string = props.label ? props.label as string : ""

    return (
        <div>

            <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept={props.accept}
            />

        </div>
    )
}