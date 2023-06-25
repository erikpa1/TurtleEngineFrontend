import React from "react";

import SceneDefinition from "@platform/scene/SceneDefinition";
import {SceneMeshNode, SceneMeshView} from "@platform/scene/SceneMeshNode";


interface SceneDefinitionDomProps {
    sceneDefinition: SceneDefinition
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