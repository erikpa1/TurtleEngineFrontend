import React from "react";

import {TGui} from "@external/tgui";

import ProjectApi from "@api/project/ProjectApi";

import PlatformDispatcher from "@api/PlatformDispatcher";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import FsApi from "@api/FsApi";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import PanoramaAsset from "@platform/assets/PanoramaAsset";


interface CreatePanoramaOffcContentProps {
    createPanoramaData: UploadAssetFileParams
}

export default function CreatePanoramaOffcContent({createPanoramaData}: CreatePanoramaOffcContentProps) {

    const project = useActiveProjectZus

    createPanoramaData.folder = PanoramaAsset.FOLDER

    const [imagePath, setImagePath] = React.useState(createPanoramaData.path_from)

    const inputRef = React.useRef<any>()

    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                const converted = FsApi.convertFilePath(filePath)
                createPanoramaData.path_from = filePath
                createPanoramaData.destination_name = `Default.${FsApi.GetFileExtension(filePath)}`

                console.log(createPanoramaData)

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