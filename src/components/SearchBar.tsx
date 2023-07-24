import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {useTranslation} from "react-i18next";
import Card from "@mui/material/Card";


interface UniversalInputSearchBarProps {
    placeHolder?: string
}

export default function UniversalInputSearchBar(props: UniversalInputSearchBarProps) {

    const _placeHolder = props.placeHolder ?? ""


    const [t] = useTranslation()

    return (
        <Card style={{width: "400px", padding: "0.25em"}}>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={t(_placeHolder) ?? ""}
                inputProps={{'aria-label': 'search google maps'}}
            />
        </Card>
    );
}

export function MiddleSearchBar({}) {
    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            <UniversalInputSearchBar placeHolder={"search"}/>
        </div>
    )
}