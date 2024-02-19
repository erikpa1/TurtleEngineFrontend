import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Drawer,
    Fab,
    FormControl, Grid,
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
import SceneCard from "@views/scene/SceneCard";

export default function ScenesView({}) {

    const [isLoading, setIsLoading] = React.useState(true)
    const [scenes, setScenes] = React.useState<Array<TurtleScene>>([])

    async function refresh() {
        setIsLoading(true)
        const response = await SceneApi.GetScenes("")
        setScenes(response)
        setIsLoading(false)
    }

    React.useEffect(() => {
        refresh()
    }, [])


    return (
        <div>
            <Container>

                <Stack
                    style={{
                        marginTop: "2em"
                    }}
                    gap={3}>

                    <MiddleSearchBar/>

                    {
                        isLoading ? <CircularProgress/> :
                            <Grid container spacing={2}>
                                {
                                    scenes.map((val) => {
                                        return (
                                            <Grid item>
                                                <SceneCard
                                                    key={val.uid}
                                                    scene={val}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                    }
                </Stack>
            </Container>
            <_FloatingButton onRefresh={refresh}/>
        </div>
    )
}

function _FloatingButton({onRefresh}) {

    const [t] = useTranslation()

    const [show, setShow] = React.useState(false)

    function onClose() {
        setShow(true)
    }

    return (
        <>
            <div style={{
                position: "absolute",
                bottom: "2em",
                right: "2em"
            }}>
                <Fab
                    size={"small"}
                    onClick={onClose}
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

                    <CreateOrEditSceneView
                        onUpdate={() => {
                            onClose()
                            onRefresh()
                        }}
                        onStart={onClose}
                    />

                </Container>
            </Drawer>
        </>

    )
}