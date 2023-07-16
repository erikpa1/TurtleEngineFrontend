import {useParams} from "react-router-dom";
import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import {MiddleSpinner} from "@components/Spinners";
import VideoData from "@platform/assets/video";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";
import Asset from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import TauriOsPlugin from "../../../tauri/plugin_os";
import ImagesApi from "@api/ImagesApi";

export default function VideoEditor({}) {

    const {projectuid, videouid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _videoUid: string = videouid ?? ""

    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetAndAssetData<VideoData>(VideoData, _projectUid, _videoUid).then((value) => {
            setAsset(value)
        })

    }, [_projectUid, _videoUid])

    if (asset) {
        return (
            <ViewContainer>
                <_VideoEditor asset={asset}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _VideoEditorProps {
    asset: Asset
}

function _VideoEditor({asset}: _VideoEditorProps) {

    const video: VideoData = asset.data

    return (

        <div className={"vstack gap-3"}>

            <_PreviewCard asset={asset}/>

            <TGui.Card>

                <TGui.CardContent style={{
                    height: "650px"
                }}>
                    <video
                        id={"video-editor-player"}
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

            <_FilesView/>

        </div>
    )
}


function _PreviewCard({asset}) {

    const [rnd, setRnd] = React.useState(Math.random())

    function refresh() {
        setRnd(Math.random())
    }


    return (
        <TGui.Card style={{
            width: "400px"
        }}>

            <TGui.CardMedia
                sx={{height: 140}}
                image={FsTools.ConvertFilePathRnd(asset.GetPreviewPath())}
            />

            <TGui.CardContent>
                <TGui.Typography gutterBottom variant="h5" component="div">
                    {asset.name}
                </TGui.Typography>
            </TGui.CardContent>

            <_AssetControlBars asset={asset} onRefresh={refresh}/>
        </TGui.Card>

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


function _AssetControlBars({asset, onRefresh}: { asset: Asset, onRefresh: any }) {

    const lock = useGlobalAppLock()

    const inputRef = React.useRef<any>()

    async function takeSnapshotPressed() {

        lock.lock()

        if (PlatformDispatcher.IsDesktop()) {
            const filePath = await PlatformDispatcher.OpenAnySingleFileDialog("Image", "png")

            if (filePath !== "") {
                const pathToSave = `${asset.GetFolderPath()}/Preview.png`

                await ImagesApi.GeneratePreviewDesktop(filePath, pathToSave, 512)
            }
            lock.unlock()

            onRefresh()

        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }


    return (
        <TGui.CardActions>
            <TGui.Button
                label={"upload.snapshot"}
                onClick={takeSnapshotPressed}
            />
            <input
                ref={inputRef}
                onChange={takeSnapshotPressed}
                type={"file"}
                hidden
            />
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

function _FilesView({}) {
    return (
        <TGui.Card>

            <TGui.CardContent>
                a
                B
                C
                D
            </TGui.CardContent>

        </TGui.Card>
    )
}