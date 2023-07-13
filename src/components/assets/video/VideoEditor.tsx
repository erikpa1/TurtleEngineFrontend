import {useParams} from "react-router-dom";
import React from "react";
import Material from "@platform/assets/material";
import {ViewContainer} from "@components/ViewContainer";
import {MiddleSpinner} from "@components/Spinners";
import VideoData from "@platform/assets/video";
import AssetsApi from "@api/AssetsApi";
import Assets from "@platform/assets/Assets";
import {TGui} from "@external/tgui";
import Typography from "@mui/material/Typography";
import Asset, {AssetData} from "@platform/assets/Asset";
import FsTools from "@api/FsTools";
import ConstantsApi from "@api/ConstantsApi";
import html2canvas from "html2canvas";
import VideoAssetPickView from "@components/assets/video/PickVideoView";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import PlatformDispatcher from "@api/PlatformDispatcher";

export default function VideoEditor({}) {

    const {projectuid, videouid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _videoUid: string = videouid ?? ""

    const [asset, setAsset] = React.useState<Asset | null>(null)
    const [video, setVideo] = React.useState<VideoData | null>(null)

    React.useEffect(() => {
        AssetsApi.GetAssetAndAssetData(VideoData, _projectUid, _videoUid).then((value) => {
            setVideo(value.data)
            setAsset(value.asset)
        })

    }, [_projectUid, _videoUid])

    if (video && asset) {
        return (
            <ViewContainer>
                <_VideoEditor asset={asset} video={video}/>
            </ViewContainer>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }
}

interface _VideoEditorProps {
    video: VideoData
    asset: Asset
}

function _VideoEditor({video, asset}: _VideoEditorProps) {


    return (

        <div className={"hstack gap-3"}>


            <div className={"vstack gap-3"} style={{width: "750px"}}>

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

                    <TGui.CardContent>
                        <TGui.Typography gutterBottom variant="h5" component="div">
                            {asset.name}
                        </TGui.Typography>

                    </TGui.CardContent>

                    <_VideoControlBars/>
                </TGui.Card>


            </div>

        </div>
    )
}


function _VideoControlBars({}) {

    const snapRef = React.useRef<any>()


    function takeSnapshot() {
        alert("Unimplemented")
    }


    return (
        <TGui.CardActions>
            <TGui.Button
                label={"snapshot"}
                onClick={takeSnapshot}
            />

            <_ReplaceButton/>

        </TGui.CardActions>
    )
}

function _ReplaceButton() {


    const inputRef = React.useRef<any>()

    function selectVideoPressed() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenAnySingleFileDialog("Video", "mp4").then((filePath) => {

                if (filePath !== "") {
                    console.log(filePath)
                }


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