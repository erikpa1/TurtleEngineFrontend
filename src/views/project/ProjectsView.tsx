import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {useTranslation} from "react-i18next";
import TauriOsPlugin from "../../tauri/plugin_os";
import PlatformDispatcher from "@api/PlatformDispatcher";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function ProjectsView({}) {

    const [t] = useTranslation()

    function _openProjectPressed() {
        PlatformDispatcher.OpenTurtleProjectDialog().then((val) => {
            console.log(val)
        })
    }

    return (
        <Stack spacing={1} direction={"row"}>
            <Item
                style={{
                    cursor: "pointer"
                }}
                onClick={_openProjectPressed}
            >
                <img
                    src={"/icons/Projects.svg"}
                    style={{
                        width: "2em",
                        height: "2em"
                    }}
                />
                {t("open.project")}
            </Item>
        </Stack>
    )
}