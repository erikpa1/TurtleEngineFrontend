import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Drawer,
    Fab,
    FormControl,
    Input,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";

import AddIcon from '@mui/icons-material/Add';
import {Form} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import SceneApi from "@api/SceneApi";
import TurtleScene from "@data/scene";
import CreateOrEditSceneView from "@views/scene/CreateOrEditSceneView";
import {MiddleSearchBar} from "@components/SearchBar";

export default function ScenesView({}) {

    const [isLoading, setIsLoading] = React.useState(true)
    const [scenes, setScenes] = React.useState<Array<TurtleScene>>([])


    async function refresh() {
        setIsLoading(true)

        const response = await SceneApi.GetScenes("")
        console.log(response)
        setScenes(response)

        setIsLoading(false)
    }

    React.useEffect(() => {

        refresh()

    }, [])


    return (
        <>
            <Container>
                <MiddleSearchBar/>

                {
                    isLoading ? <CircularProgress/> :
                        <Stack>
                            {
                                scenes.map((val) => {
                                    return (
                                        <Typography
                                            key={val.uid}
                                        >
                                            {val.name}
                                        </Typography>
                                    )
                                })
                            }
                        </Stack>
                }


            </Container>
            <_FloatingButton/>
        </>
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