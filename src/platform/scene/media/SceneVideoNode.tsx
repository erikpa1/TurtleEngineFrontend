import React from "react";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import SceneNodeMover from "@components/assets/tools/SceneNodeMover";

import {SceneNode} from "@platform/scene/SceneNode";

import {CurvedVideoWorldCanvas, VideoWorldCanvas} from "@components/assets/video/VideoWorldCanvas";
import Asset from "@platform/assets/Asset";
import VideoData from "@platform/assets/video";
import AssetsApi from "@api/AssetsApi";
import {Plane, useTexture} from "@react-three/drei";


export class SceneVideoNode extends SceneNode {

    static TYPE = "video"

    content_uid = ""

    type = SceneVideoNode.TYPE

    looping = false
    muted = false
    auto_play = false
    progress_enabled = true
    controls_enabled = true
    pre_play_preview = true
    theatre_mode = false

    view_mesh = "plane"

    constructor() {
        //pass
        super()
    }


    FromJson(jObject: any | SceneVideoNode) {
        super.FromJson(jObject);
        this.content_uid = jObject.content_uid ?? ""


        this.looping = jObject.looping && this.looping
        this.muted = jObject.muted && this.muted
        this.auto_play = jObject.auto_play && this.auto_play
        this.progress_enabled = jObject.progress_enabled && this.progress_enabled
        this.controls_enabled = jObject.controls_enabled && this.controls_enabled
        this.pre_play_preview = jObject.pre_play_preview && this.pre_play_preview
        this.theatre_mode = jObject.theatre_mode && this.theatre_mode

        this.view_mesh = jObject.view_mesh && this.view_mesh


    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            content_uid: this.content_uid,
            looping: this.looping,
            muted: this.muted,
            auto_play: this.auto_play,
            progress_enabled: this.progress_enabled,
            controls_enabled: this.controls_enabled,
            pre_play_preview: this.pre_play_preview,
            theatre_mode: this.theatre_mode,

        }
    }

}

interface SceneVideoViewProps {
    node: SceneVideoNode
}

export function SceneVideoNodeView({node}: SceneVideoViewProps) {

    const projectZus = useActiveProjectZus()

    const [asset, setAsset] = React.useState<Asset | null>(null)

    const [_node, setNode] = React.useState({v: node})


    React.useEffect(() => {

        node.onChanged = () => {
            console.log("Here")
            setNode({v: node})
        }

        AssetsApi.GetAssetAndAssetData<VideoData>(VideoData,
            projectZus.project.uid,
            node.content_uid
        ).then((value) => {
            setAsset(value)
        })
    }, [node.content_uid])


    if (asset) {
        return (
            <_SceneVideoView videoNode={_node.v} asset={asset}/>
        )
    } else {
        return (
            <></>
        )
    }


}

interface _SceneVideoViewProps {
    videoNode: SceneVideoNode
    asset: Asset
}


function _SceneNoVideoView({asset, videoNode}: _SceneVideoViewProps) {

    return (
        <></>
    )
    // const [node, setNode] = React.useState({v: video})
    //
    // video.onChanged = () => {
    //     console.log("Here")
    //     setNode({v: video})
    // }
    //
    // return (
    //     <SceneNodeMover node={node.v}>
    //         <VideoWorldCanvas
    //             nodeUid={node.v.uid}
    //             videoPath={""}
    //         />
    //     </SceneNodeMover>
    //
    //
    // )
}


function _SceneVideoView({asset, videoNode}: _SceneVideoViewProps) {


    const controlBarsHeight = (-videoNode.scale[1] * 0.5) - (videoNode.scale[1] * 0.1)

    const slidedBarHeight = (-videoNode.scale[1] * 0.5) - (videoNode.scale[1] * 0.025)

    return (
        <SceneNodeMover node={videoNode}>

            {
                videoNode.view_mesh === "plane" &&
                <VideoWorldCanvas
                    nodeUid={videoNode.uid}
                    videoPath={""}/>
            }

            {
                videoNode.view_mesh === "curved_plane" &&
                <CurvedVideoWorldCanvas
                    scale={videoNode.scale}
                    nodeUid={videoNode.uid}
                    videoPath={""}
                />

            }

            <group scale={[0.8, 1, 1]}>
                <_ProgressBard position={[0, slidedBarHeight, 0]}/>
                <_ControlBar position={[0, controlBarsHeight, 0]}/>
            </group>


        </SceneNodeMover>


    )
}


function _ProgressBard({position}) {
    return (
        <group position={position}>
            <Plane
                scale={[1, 0.01, 0.1]}
            >
                <meshBasicMaterial
                    color={"white"}
                />
            </Plane>

            <Plane
                position={[-0.5, 0, 0.0005]}
                scale={[0.04, 0.04, 0.04]}
            >
                <meshBasicMaterial
                    color={"#d06972"}
                />
            </Plane>
        </group>
    )
}

function _ControlBar({position}) {

    const playTexture = useTexture("/icons/128/Play.png")

    const pauseTexture = useTexture("/icons/128/Pause.png")

    const mute = useTexture("/icons/128/Mute.png")

    const umute = useTexture("/icons/128/Unmute.png")

    React.useEffect(() => {
        //pass
    }, [])

    return (
        <group position={position}>
            <Plane
                name={"videocontrol-play"}
                scale={[0.1, 0.1, 0.1]}
                position={[-0.15, 0, 0]}
            >
                <meshBasicMaterial
                    transparent={true}
                    map={playTexture}
                />
            </Plane>
            <Plane
                name={"videocontrol-pause"}
                scale={[0.1, 0.1, 0.1]}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial
                    transparent={true}
                    map={pauseTexture}
                />
            </Plane>
            <Plane
                name={"videocontrol-pause"}
                scale={[0.1, 0.1, 0.1]}
                position={[0.15, 0, 0]}
            >
                <meshBasicMaterial
                    transparent={true}
                    map={mute}
                />
            </Plane>
        </group>
    )
}

