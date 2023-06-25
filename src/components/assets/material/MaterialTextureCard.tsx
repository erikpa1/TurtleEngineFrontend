import React from "react";
import {TGui} from "@external/tgui";



export default function MaterialTextureCard({type, path}) {
    return (
        <TGui.Card>
            <TGui.CardMedia
                sx={{height: 140}}
                image={path}
                title={path}
            />
            <TGui.CardContent>
                <TGui.Typography gutterBottom variant="h5" component="div">
                    {type}
                </TGui.Typography>

            </TGui.CardContent>
            <TGui.CardActions>
                <TGui.Button label={"replace"}/>
                <TGui.Button label={"clear"} color={"error"}/>
            </TGui.CardActions>

        </TGui.Card>
    )
}