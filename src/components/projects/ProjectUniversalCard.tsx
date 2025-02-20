import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {Project} from "@data/project/Project"
import {useTranslation} from "react-i18next"

import ProjectApi from "@api/project/ProjectApi"
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus"
import {Routes, useNavigate} from "react-router-dom"
import RoutesManager from "@platform/RoutesManager"
import FsTools from "@api/FsTools"
import {TGui} from "@external/tgui"
import TauriWindowPlugin from "../../tauri/plugin_window"
import PlatformDispatcher from "@api/PlatformDispatcher"

interface ProjectUniversalCardProps {
    project: Project
    onEdit: (project: Project) => void
}

export default function ProjectUniversalCard({project, onEdit}: ProjectUniversalCardProps) {


    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const navigate = useNavigate()


    async function activateProjectPressed() {

        if (PlatformDispatcher.IsDesktop()) {
            const projectData = await ProjectApi.ActivateProject(project.uid)
            if (projectData) {
                navigate(RoutesManager.Assets(project.uid))
                TauriWindowPlugin.ChangeWindowTitle(project.name)
            }
        } else {
            document.title = project.name
            navigate(RoutesManager.Scenes(project.uid))

        }


    }


    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image={FsTools.ConvertFilePath(FsTools.GetPathInProject(project.uid, "Preview.png"))}
                // images="/textures/UniversalTurtle.png"
                title="green iguana"
                style={{
                    cursor: "pointer"
                }}
                onClick={activateProjectPressed}
            />
            <CardContent>
                <TGui.TextBig>
                    {project.name}
                </TGui.TextBig>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        minHeight: "50px",
                        maxHeight: "50px"
                    }}
                >
                    {project.description}
                </Typography>

                <TGui.TextMicro>
                    ({project.uid})
                </TGui.TextMicro>

            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={activateProjectPressed}>
                    {t("open")}
                </Button>
                <Button onClick={onEdit as any} size="small">{t("edit")}</Button>
            </CardActions>
        </Card>
    );
}