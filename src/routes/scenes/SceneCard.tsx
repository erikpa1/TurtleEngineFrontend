import React from 'react'
import {useTranslation} from "react-i18next"

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {Project} from "@data/project/Project"


import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus"
import {Routes, useNavigate} from "react-router-dom"
import RoutesManager from "@platform/RoutesManager"
import FsTools from "@api/FsTools"
import {TGui} from "@external/tgui"

import PlatformDispatcher from "@api/PlatformDispatcher"
import TurtleScene from "@data/project/Scene"

interface SceneCardProps {
    scene: TurtleScene
    onEdit: (project: Project) => void
}

export default function SceneCard({scene, onEdit}: SceneCardProps) {


    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const navigate = useNavigate()


    async function activateScenePressed() {
        if (PlatformDispatcher.IsDesktop()) {

        } else {
            document.title = scene.name
            navigate(RoutesManager.SceneEditor(scene.parent, scene.uid))
        }
    }


    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image={FsTools.ConvertFilePath(FsTools.GetPathInProject(scene.uid, "Preview.png"))}
                // images="/textures/UniversalTurtle.png"
                title="green iguana"
                style={{
                    cursor: "pointer"
                }}
                onClick={activateScenePressed}
            />
            <CardContent>
                <TGui.TextBig>
                    {scene.name}
                </TGui.TextBig>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        minHeight: "50px",
                        maxHeight: "50px"
                    }}
                >
                    {scene.description}
                </Typography>

                <TGui.TextMicro>
                    ({scene.uid})
                </TGui.TextMicro>

            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={activateScenePressed}>
                    {t("open")}
                </Button>
                <Button onClick={onEdit as any} size="small">{t("edit")}</Button>
            </CardActions>
        </Card>
    );
}