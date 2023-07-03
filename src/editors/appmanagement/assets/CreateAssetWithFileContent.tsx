import React from "react";

import {TGui} from "@external/tgui";

import ProjectApi from "@api/project/ProjectApi";

import PlatformDispatcher from "@api/PlatformDispatcher";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import FsTools from "@api/FsTools";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import PanoramaAsset from "@platform/assets/panorama";
import {AssetDefinition} from "@platform/assets/Assets";


interface CreatePanoramaOffcContentProps {
    assetDefinition: AssetDefinition
    uploadFileParams: UploadAssetFileParams
}

export default function CreateAssetWithFileContent({
                                                       assetDefinition,
                                                       uploadFileParams
                                                   }: CreatePanoramaOffcContentProps) {


    const [imagePath, setImagePath] = React.useState(uploadFileParams.path_from)

    const inputRef = React.useRef<any>()

    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                const converted = FsTools.ConvertFilePath(filePath)
                uploadFileParams.path_from = filePath
                uploadFileParams.destination_name = `Default.${FsTools.GetFileExtension(filePath)}`

                setImagePath(filePath)
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
                    image={FsTools.ConvertFilePath(imagePath)}
                />

                <TGui.CardActions>
                    <TGui.Button
                        label={"replace"}
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

interface ImagePickerProsp {
    image: string
    imagePickedDesktop: (image: string) => void
    imagePickedWeb: (image: string) => void

}

export function ImagePicker({
                                image,
                                imagePickedDesktop,
                                imagePickedWeb,

                            }: ImagePickerProsp) {

    const inputRef = React.useRef<any>()

    function selectImageClicked() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenImageDialog().then((filePath) => {
                if (filePath) {
                    imagePickedDesktop(filePath)
                }
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
                    image={FsTools.ConvertFilePath(image)}
                />

                <TGui.CardActions>
                    <TGui.Button
                        label={"replace"}
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