import React from "react";

import VirtualSceneDefinition from "@platform/scene/VirtualSceneDefinition";
import {SceneMeshNode, SceneMeshNodeView} from "@platform/scene/world/SceneMeshNode";
import {SceneVideoNode, SceneVideoView} from "@platform/scene/media/SceneVideoNode";


interface SceneDefinitionDomProps {
    sceneDefinition: VirtualSceneDefinition
}

export default function SceneDefinitionDOM(props: SceneDefinitionDomProps) {


    const [view, setView] = React.useState<any>()

    function refresh() {

        const elements = new Array<any>()

        const root = props.sceneDefinition.root

        console.log(root.children)

        root.children.forEach((value) => {

            if (value instanceof SceneMeshNode) {
                elements.push(<SceneMeshNodeView
                    key={value.uid}
                    node={value as SceneMeshNode}
                />)
            } else if (value instanceof SceneVideoNode) {
                elements.push(<SceneVideoView
                    key={value.uid}
                    node={value as SceneMeshNode}
                />)
            }

        })

        setView(elements)
    }


    React.useEffect(() => {
        const root = props.sceneDefinition.root
        root.onChildrenChanged = refresh

        refresh()

    }, [])

    if (view) {
        return view
    } else {
        return <></>

    }
}