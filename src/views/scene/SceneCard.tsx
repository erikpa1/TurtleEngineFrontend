import React from "react"
import Card from "@mui/material/Card";
import {Button, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import TurtleScene from "@data/scene";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import RoutesApi from "@app/RoutesApi";


interface SceneCardProps {
    scene: TurtleScene
}

export default function SceneCard({scene}: SceneCardProps) {

    const [t] = useTranslation()

    const navigate = useNavigate()

    console.log(scene)

    return (
        <Card sx={{
            width: 345
        }}>
            <CardMedia
                sx={{height: 140}}
                image={"/textures/UniversalTurtle.png"}
                title={scene.name}
            />

            <CardContent>
                <Typography gutterBottom variant={"h5"} component={"div"}>
                    {scene.name}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        navigate(RoutesApi.GetSceneRoute("x", scene.uid))
                    }}
                >
                    {t("open")}
                </Button>
                <Button size="small">{t("edit")}</Button>
                <Button size="small">{t("delete")}</Button>
            </CardActions>

        </Card>
    )
}