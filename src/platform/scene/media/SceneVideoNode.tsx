import React from "react";

import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import SceneNodeMover from "@components/assets/tools/SceneNodeMover";

import {SceneNode} from "@platform/scene/SceneNode";

import {VideoWorldCanvas} from "@components/assets/video/VideoWorldCanvas";
import Asset from "@platform/assets/Asset";
import VideoData from "@platform/assets/video";
import AssetsApi from "@api/AssetsApi";


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

    const [videoData, setVideoDat] = React.useState<VideoData | null>(null)
    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAssetAndAssetData<VideoData>(VideoData,
            projectZus.project.uid,
            node.content_uid
        ).then((value) => {
            setAsset(value.asset)
            setVideoDat(value.data)
        })
    }, [node.content_uid])


    if (asset && videoData) {
        return (
            <_SceneVideoView video={node} videoAsset={asset}/>
        )
    } else {
        return (
            <></>
        )
    }


}

interface _SceneVideoViewProps {
    video: SceneVideoNode
    videoAsset: Asset
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


