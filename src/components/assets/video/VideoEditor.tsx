import {useParams} from "react-router-dom";
import React from "react";
import {BigViewContainer, ViewContainer} from "@components/ViewContainer";

import VideoData from "@platform/assets/video";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";
import Asset from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import TauriOsPlugin from "../../../tauri/plugin_os";
import ImagesApi from "@api/ImagesApi";
import {useLoadAssetFromParams} from "@components/assets/assets_hooks";
import {UniversalAssetEditCard} from "@components/assets/universal/UniversalAssetEditCard";
import {AssetFilesSideView} from "@components/assets/universal/AssetFilesView";

export default function VideoEditor({}) {

    const asset = useLoadAssetFromParams()


    if (asset) {
        return (
            <BigViewContainer>
                <_VideoEditor asset={asset}/>
            </BigViewContainer>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }
}

interface _VideoEditorProps {
    asset: Asset
}

function _VideoEditor({asset}: _VideoEditorProps) {

    const video: VideoData = asset.data

    return (

        <TGui.Row>

            <TGui.Col xs={3}>
                <TGui.Stack gap={3}>
                    <UniversalAssetEditCard asset={asset}/>
                    <AssetFilesSideView asset={asset}/>
                </TGui.Stack>
            </TGui.Col>

            <TGui.Col>
                <TGui.Card style={{
                    backgroundColor: TGui.Colors.WhiteMiddle
                }}>

                    <TGui.CardContent style={{
                        height: "650px"
                    }}>
                        <video
                            id={"video-editor-player-guis"}
                            controls
                            width={"100%"}
                            height={"100%"}
                            style={{
                                backgroundColor: "black"
                            }}
                        >
                            <source src={FsTools.ConvertFilePath(video.GetEntryPath())} type="video/mp4"/>
                        </video>
                    </TGui.CardContent>

                    <_VideoControlBars asset={asset} assetData={video}/>
                </TGui.Card>

            </TGui.Col>


        </TGui.Row>
    )
}


function _VideoControlBars({asset, assetData}) {

    const snapRef = React.useRef<any>()


    function takeSnapshot() {
        alert("Unimplemented")
    }


    return (
        <TGui.CardActions>
            <_ReplaceVideoButton asset={asset} assetData={assetData}/>
        </TGui.CardActions>
    )
}


function _ReplaceVideoButton({asset, assetData}: { assetData: VideoData, asset: Asset }) {

    const lock = useGlobalAppLock()
    const inputRef = React.useRef<any>()


    async function replaceFile(fromFile: string) {

        const existingPath = `${asset.GetFolderPath()}Default.${assetData.video_extension}`

        await TauriOsPlugin.DeleteFile(existingPath)

        assetData.video_extension = FsTools.GetFileExtension(fromFile)

        const toPath = `${asset.GetFolderPath()}Default.${assetData.video_extension}`

        console.log(`Copying from: ${fromFile}`)
        console.log(`To: ${toPath}`)

        Promise.all([
            TauriOsPlugin.CopyFile(fromFile, toPath),
            AssetsApi.UploadAssetData(asset.parent_project_uid, asset.uid, assetData)
        ])
    }

    function selectVideoPressed() {

        lock.lock()

        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenAnySingleFileDialog("Video", "mp4").then((filePath) => {
                replaceFile(filePath).then(() => {
                    lock.unlock()
                })
            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }

    return (
        <>
            <TGui.Button label={"replace"} onClick={selectVideoPressed}/>
            <input
                ref={inputRef}
                onChange={selectVideoPressed}
                type={"file"}
                hidden
            />
        </>
    )
}

