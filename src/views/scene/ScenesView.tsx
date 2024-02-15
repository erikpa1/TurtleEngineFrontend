import React from "react";
import {Box, Button, Container, Drawer, Fab, FormControl, Input, Modal, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";

import AddIcon from '@mui/icons-material/Add';
import {Form} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import SceneApi from "@api/SceneApi";
import TurtleScene from "@data/scene";
import CreateOrEditSceneView from "@views/scene/CreateOrEditSceneView";

export default function ScenesView({}) {


    return (
        <Container>
            <_FloatingButton/>

            <Stack>
                <div>Scene1</div>
                <div>Scene2</div>
                <div>Scene3</div>
            </Stack>


        </Container>
    )
}

function _FloatingButton({}) {

    const [t] = useTranslation()

    const [show, setShow] = React.useState(false)

    return (
        <>
            <div style={{
                position: "absolute",
                bottom: "2em",
                right: "2em"
            }}>
                <Fab
                    size={"small"}
                    onClick={() => setShow(true)}
                    color="success" aria-label="add">
                    <AddIcon/>
                </Fab>
            </div>

            <Drawer
                anchor={"right"}
                open={show}
                onClose={() => setShow(false)}
            >
                <Container
                    style={{
                        width: "20em",
                        padding: "1em"
                    }}
                >

                    <CreateOrEditSceneView onUpdate={() => setShow(false)}/>

                </Container>
            </Drawer>
        </>

    )
}