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


interface ProjectUniversalCardProps {
    project: ProjectLight
    onRefresh?: () => void
}

export default function ProjectUniversalCard({project, onRefresh}: ProjectUniversalCardProps) {

    const [t] = useTranslation()


    const [val, setVal] = React.useState({project: project})

    const popupZus = useGlobalPopup()

    const editPressed = () => {

        popupZus.pushElement(<EditProjectDrawer
            uid={project.uid}
            onClose={popupZus.popElement}
            onRefresh={onRefresh}

        />)

    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image="/textures/UniversalTurtle.png"
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
                <Button size="small">{t("core.open")}</Button>
                <Button onClick={editPressed} size="small">{t("core.edit")}</Button>
            </CardActions>
        </Card>
    );
}