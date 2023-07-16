import React from "react";


import {SceneMeshNode, SceneMeshNodeView} from "@platform/scene/world/SceneMeshNode";
import {SceneVideoNode, SceneVideoNodeView} from "@platform/scene/media/SceneVideoNode";
import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import SceneNodesFactory from "@platform/scene/SceneNodesFactory";


interface SceneDefinitionDomProps {
    sceneDefinition: VirtualSceneDefinition
}

export default function SceneDefinitionDOM(props: SceneDefinitionDomProps) {


    const [view, setView] = React.useState<any>()

    function refresh() {

        const elements = new Array<any>()

        const root = props.sceneDefinition.root

        root.children.forEach((value) => {

            const NodeHandler: any = SceneNodesFactory.GetFiberHandler(value.type)

            elements.push(
                <NodeHandler key={value.uid} node={value}/>
            )
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