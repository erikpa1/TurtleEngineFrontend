import React from "react";

import {TGui} from "@external/tgui";

import ProjectApi from "@api/project/ProjectApi";

import PlatformDispatcher from "@api/PlatformDispatcher";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import FsApi from "@api/FsApi";
import {CreatePanoramaAssetParams} from "@editors/appmanagement/assets/CreateParams";


interface CreatePanoramaOffcContentProps {
    createPanoramaData: CreatePanoramaAssetParams
}

export default function CreatePanoramaOffcContent({createPanoramaData}: CreatePanoramaOffcContentProps) {

    const project = useActiveProjectZus

    const [imagePath, setImagePath] = React.useState(createPanoramaData.panorama_path)

    const inputRef = React.useRef<any>()

    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                const converted = FsApi.convertFilePath(filePath)
                createPanoramaData.panorama_path = filePath
                setImagePath(converted)

            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }

    function imageSelected() {
        const curr: HTMLInputElement = inputRef.current as any
    }

    return (
        <>
            <TGui.Card>
                <TGui.CardMedia
                    sx={{height: 140}}
                    image={FsApi.convertFilePath(imagePath)}
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