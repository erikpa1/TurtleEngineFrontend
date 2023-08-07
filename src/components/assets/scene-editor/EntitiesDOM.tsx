import React from "react";


import VirtualSceneDefinition from "@platform/assets/scenes/VirtualSceneDefinition";
import SceneEntitiesFactory from "@platform/entities/SceneEntitiesFactory";


interface EntitiesDOMProps {
    sceneDefinition: VirtualSceneDefinition
}

export default function EntitiesDOM(props: EntitiesDOMProps) {


    const [view, setView] = React.useState<any>()

    function refresh() {

        const elements = new Array<any>()

        const root = props.sceneDefinition.root

        console.log(root.children)

        root.children.forEach((value) => {

            console.log(`Adding to world: ${value.type}`)

            const NodeHandler: any = SceneEntitiesFactory.GetFiberHandler(value.type)

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