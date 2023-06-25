import React from "react";

import VirtualSceneDefinition from "@platform/scene/VirtualSceneDefinition";
import {SceneMeshNode, SceneMeshView} from "@platform/scene/SceneMeshNode";


interface SceneDefinitionDomProps {
    sceneDefinition: VirtualSceneDefinition
}

export default function SceneDefinitionDOM(props: SceneDefinitionDomProps) {


    const [view, setView] = React.useState<any>()


    React.useEffect(() => {
        const elements = new Array<any>()

        props.sceneDefinition.root.children.forEach((value) => {
            elements.push(<SceneMeshView mesh={value as SceneMeshNode}/>)

        })

        setView(elements)

    }, [])

    if (view) {
        return view
    } else {
        return <></>

    }
}