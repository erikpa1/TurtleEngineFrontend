import React from "react";

import {TGui} from "@external/tgui";

import ProjectApi from "@api/project/ProjectApi";

import PlatformDispatcher from "@api/PlatformDispatcher";


import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import FsApi from "@api/FsApi";


export default function CreatePanoramaOffcContent({}) {

    const project = useActiveProjectZus

    const inputRef = React.useRef()

    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                ProjectApi.ChangeProjectCoverDesktop(project.uid, filePath)
            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }

    }

    function imageSelected() {
        const curr: HTMLInputElement = inputRef.current as any
        console.log(curr.files)

    }


    return (
        <>
            <TGui.Card>
                <TGui.CardMedia
                    sx={{height: 140}}
                    image={FsApi.convertFilePath("C:\\Work\\TurtleEngine\\TurtleEngineFrontend\\target\\platform\\Panoramas\\PreviewPanorama.jpg")}
                />

                <TGui.CardActions>
                    <TGui.Button
                        label={"core.replace"}
                        onClick={selectImageClicked}

                    />
                    <input
                        ref={inputRef}
                        onChange={imageSelected}
                        type={"file"}
                        hidden
                    />
                </TGui.CardActions>
            </TGui.Card>
        </>
    )
}