import React from "react";
import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";

import {
    UniversalMeshCanvas,
    UniversalMeshOrbitControls,
    UniversalWorldEnvironment
} from "@components/assets/canvases/UniversalMeshCanvas";

import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";

interface VideoFilePickViewProps {


}


export default function VideoAssetPickView(props: VideoFilePickViewProps) {

    const [t] = TGui.T()

    const inputRef = React.useRef<any>()

    const [videoPath, setVideoPath] = React.useState("")

    function selectMeshPressed() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenAnySingleFileDialog("Video", "mp4").then((filePath) => {

                if (filePath !== "") {
                    setVideoPath(filePath)
                    // if (props.onMeshSelectDesktop) {
                    //     props.onMeshSelectDesktop(filePath)
                    // }
                }


            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }


    return (
        <div>
            <TGui.Box
                sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                style={{
                    padding: "5px"
                }}
            >


                <input
                    ref={inputRef}
                    onChange={selectMeshPressed}
                    type={"file"}
                    hidden
                />
            </TGui.Box>
        </div>


    )

}