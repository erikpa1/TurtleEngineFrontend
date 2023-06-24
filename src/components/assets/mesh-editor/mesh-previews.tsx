import React from "react";
import {UniversalMeshCanvas, UniversalWorldEnvironment} from "@components/assets/canvases/UniversalMeshCanvas";
import {PivotControls} from "@react-three/drei";
import {TGui} from "@external/tgui";


interface FileMeshPreviewProps {
    filePath: string
    style?: React.CSSProperties
}

export default function FileMeshPreview({filePath, style}: FileMeshPreviewProps) {

    console.log(style)
    return (
        <div>
            <TGui.Box
                sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                style={{
                    padding: "5px"
                }}
            >
                <UniversalMeshCanvas style={{
                    height: "250px"
                }}>

                    <UniversalWorldEnvironment/>
                </UniversalMeshCanvas>

                <TGui.Button label={"Snapshot"}/>
            </TGui.Box>
        </div>


    )

}