import React from "react";

import {useTranslation} from "react-i18next";


import {FormControl, InputLabel, Select, TextField} from "@mui/material";
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

interface TurtleSelectProps {
    name: string
    value: string
    onChange: any
    items: Array<[string, string]>
}


export function TurtleSelectField(props: TurtleSelectProps | any): JSX.Element {

    const [t] = useTranslation()

    const _label: string = props.label ? props.label as string : ""
    const _translated = t(_label)

    return (
        <FormControl>
            <InputLabel id={`TurtleSelectField-${_label}`}>{_translated}</InputLabel>
            <Select
                className={props.disabled ? "" : "turtle-shaded-button"}
                labelId={`TurtleSelectField-${_label}`}
                id={`TurtleSelectFieldId-${_label}`}
                value={props.value}
                label={_translated}
                onChange={props.onChange}
                {...props}
            >
                {
                    props.items.map((value) => {
                        return (
                            <TGui.MenuItem key={value[0]} value={value[0]}>{t(value[1])}</TGui.MenuItem>
                        )
                    })
                }

            </Select>
        </FormControl>


    )
}

interface TurtleClickSelectProps {
    name: string
    value: string
    onClick: any

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