import React from "react";
import {TGui} from "@external/tgui";

interface _MaterialTextureCardProps {
    label: string
    obj: any
    variable: string
    onRefresh: () => void

}

export default function MaterialTextureCard({label, obj, variable, onRefresh}: _MaterialTextureCardProps) {

    const [t] = TGui.T()

    const _path = obj[variable]


    function uploadFile(file: File) {
        console.log(file)
        onRefresh()
    }

    function clearPressed() {

        if (_path != "") {
            //pass
        }
        alert("TODO clearPressed")
    }

    return (
        <TGui.Card>
            <TGui.CardMedia
                sx={{height: 140}}
                image={_path}

            />
            <TGui.CardContent>
                <TGui.Typography gutterBottom variant="h5" component="div">
                    {t(label)}
                </TGui.Typography>
            </TGui.CardContent>

            <div style={{
                margin: "1em"
            }}>
                <TGui.SingleFileInput name={"Something"} onFileClicked={uploadFile}/>
            </div>

            <TGui.CardActions>
                <TGui.Button label={"clear"} color={"error"} onClick={clearPressed}/>
            </TGui.CardActions>


        </TGui.Card>
    )
}