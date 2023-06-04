import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {ProjectLight} from "@data/project/ProjectLight";
import {useTranslation} from "react-i18next";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import EditProjectDrawer from "@editors/appmanagement/projects/EditProjectDrawer";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import ProjectApi from "@api/project/ProjectApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {useNavigate} from "react-router-dom";
import RoutesManager from "@platform/RoutesManager";
import {convertFileSrc} from "@tauri-apps/api/tauri";


interface ProjectUniversalCardProps {
    project: ProjectLight
    onRefresh?: () => void
}

export default function ProjectUniversalCard({project, onRefresh}: ProjectUniversalCardProps) {


    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const projectZus = useActiveProjectZus()
    const navigate = useNavigate()


    const [val, setVal] = React.useState({project: project})

    const popupZus = useGlobalPopup()

    const editPressed = () => {

        popupZus.pushElement(<EditProjectDrawer
            uid={project.uid}
            onClose={popupZus.popElement}
            onRefresh={onRefresh}

        />)

    }

    const activateProjectPressed = () => {


        lock.lock()

        ProjectApi.ActivateProject(project.uid).then((value) => {
            lock.unlock()
            projectZus.setProject(project)
            navigate(RoutesManager.Assets(project.uid))
        })
    }


    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image={project.getFilePath("Preview.png")}
                // image="/textures/UniversalTurtle.png"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {val.project.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        minHeight: "50px",
                        maxHeight: "50px"
                    }}
                >
                    {val.project.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={activateProjectPressed}>

                    {t("core.open")}
                </Button>
                <Button onClick={editPressed} size="small">{t("core.edit")}</Button>
            </CardActions>
        </Card>
    );
}