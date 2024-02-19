import TurtleScene from "@data/scene";
import Stack from "@mui/material/Stack";
import {Button, TextField} from "@mui/material";
import React from "react";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import SceneApi from "@api/SceneApi";
import {useTranslation} from "react-i18next";


interface CreateOrEditSceneViewProps {
    scene?: TurtleScene
    onStart: () => void
    onUpdate: () => void
}

export default function CreateOrEditSceneView({scene, onStart, onUpdate}: CreateOrEditSceneViewProps) {

    const [t] = useTranslation()

    const [_scene] = React.useState<TurtleScene>(scene ?? (new TurtleScene()))

    const [name, setName] = React.useState("Name 1")

    const locker = useGlobalAppLock()

    async function createScenePressed() {
        locker.lock()
        onStart()
        _scene.name = name
        await SceneApi.CreateOrUpdateScene(_scene)
        locker.unlock()
        onUpdate()
    }

    return (
        <Stack gap={2}>
            <TextField
                label={`${t("name")}:`}
                size="small"
                value={name}
                onChange={(e) => {
                    const newVal = e.target.value
                    setName(newVal)
                    _scene.name = newVal
                }}
            />

            <Button onClick={createScenePressed}>
                {t("create")}
            </Button>

        </Stack>
    )
}