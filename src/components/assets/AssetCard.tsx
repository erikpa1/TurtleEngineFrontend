import React from "react";
import AssetParent from "@platform/assets/AssetParent";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import {TurtleButton} from "@platform/components/TurtleButtons";

interface AssetCardProps {
    asset: AssetParent
}


export default function AssetCard({asset}: AssetCardProps) {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image={asset.GetPreviewPath()}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {asset.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        minHeight: "50px",
                        maxHeight: "50px"
                    }}
                >
                    {asset.description}
                </Typography>
            </CardContent>
            <CardActions>
                <TurtleButton label={"core.edit"}/>
            </CardActions>
        </Card>
    );

}