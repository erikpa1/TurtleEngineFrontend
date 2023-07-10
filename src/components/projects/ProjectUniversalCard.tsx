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
import EditProjectOffcanvas from "@editors/appmanagement/projects/EditProjectOffcanvas";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import ProjectApi from "@api/project/ProjectApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {useNavigate} from "react-router-dom";
import RoutesManager from "@platform/RoutesManager";
import FsTools from "@api/FsTools";
import {TGui} from "@external/tgui";


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

        popupZus.pushElement(<EditProjectOffcanvas
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
                image={FsTools.ConvertFilePath(FsTools.GetPathInProject(project.uid, "Preview.png"))}
                // images="/textures/UniversalTurtle.png"
                title="green iguana"
                style={{
                    cursor: "pointer"
                }}
                onClick={activateProjectPressed}
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

                <TGui.TextMicro>
                    ({val.project.uid})
                </TGui.TextMicro>

            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={activateProjectPressed}>
                    {t("open")}
                </Button>
                <Button onClick={editPressed} size="small">{t("edit")}</Button>
            </CardActions>
        </Card>
    );
}