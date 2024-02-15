import TurtleScene from "@data/scene";
import Stack from "@mui/material/Stack";
import {Button, TextField} from "@mui/material";
import React from "react";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import SceneApi from "@api/SceneApi";
import {useTranslation} from "react-i18next";


interface CreateOrEditSceneViewProps {
    scene?: TurtleScene
    onUpdate: () => void
}

export default function CreateOrEditSceneView({scene, onUpdate}: CreateOrEditSceneViewProps) {

    const [t] = useTranslation()

    const [name, setName] = React.useState("Name 1")

    const locker = useGlobalAppLock()

    async function createScenePressed() {
        locker.lock()

        const scene = new TurtleScene()
        scene.name = name

        await SceneApi.CreateOrUpdateScene(scene)

        locker.unlock()
    }


    return (
        <Stack gap={2}>
            <TextField
                label={`${t("name")}:`}
                size="small"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />

            <Button onClick={createScenePressed}>
                {t("create")}
            </Button>

        </Stack>
    )
}