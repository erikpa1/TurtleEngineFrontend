import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {useTranslation} from "react-i18next";


interface UniversalInputSearchBarProps {
    placeHolder?: string
}

export default function UniversalInputSearchBar(props: UniversalInputSearchBarProps) {

    const _placeHolder = props.placeHolder ?? ""


    const [t] = useTranslation()

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
        >

            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={t(_placeHolder) ?? ""}
                inputProps={{'aria-label': 'search google maps'}}
            />


        </Paper>
    );
}

export function MiddleSearchBar({}) {
    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            <UniversalInputSearchBar placeHolder={"search"}/>
        </div>
    )
}