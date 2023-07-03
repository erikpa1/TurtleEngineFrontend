import React from "react";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import Assets from "@platform/assets/Assets";

import SceneNodeMover from "@components/assets/tools/SceneNodeMover";

import AssetsApi from "@api/AssetsApi";

import {SceneNode} from "@platform/scene/SceneNode";

import {VideoWorldCanvas} from "@components/assets/video/VideoWorldCanvas";


export class SceneVideoNode extends SceneNode {

    static TYPE = "video"

    content_uid = ""

    type = SceneVideoNode.TYPE

    constructor() {
        //pass
        super()
    }


    FromJson(jObject: any | SceneVideoNode) {
        super.FromJson(jObject);
        this.content_uid = jObject.content_uid ?? ""
    }

    ToJson(): any {
        return {
            ...super.ToJson(),
            content_uid: this.content_uid
        }
    }

}

interface SceneVideoViewProps {
    node: SceneVideoNode
}

export function SceneVideoView({node}: SceneVideoViewProps) {

    const projectZus = useActiveProjectZus()

    const [videoAsset, setvideoAsset] = React.useState<VideoAsset | null>(null)

    React.useEffect(() => {

        // AssetsApi.GetAssetData<VideoAsset>(Assets.Video,
        //     projectZus.project.uid,
        //     node.content_uid
        // ).then((value) => {
        //     setvideoAsset(value)
        // })
    }, [node.content_uid])


    if (videoAsset) {
        return (
            <_SceneVideoView video={node} videoAsset={videoAsset}/>
        )
    } else {
        return (
            <></>
        )
    }


}

interface _SceneVideoViewProps {
    video: SceneVideoNode
    videoAsset: VideoAsset
}


function _SceneNoVideoView({videoAsset, video}: _SceneVideoViewProps) {

    return (
        <SceneNodeMover node={video}>
            <VideoWorldCanvas
                videoPath={""}
            />
        </SceneNodeMover>


    )
}


function _SceneVideoView({videoAsset, video}: _SceneVideoViewProps) {

    return (
        <SceneNodeMover node={video}>
            <VideoWorldCanvas
                videoPath={""}
            />
        </SceneNodeMover>


    )
}


