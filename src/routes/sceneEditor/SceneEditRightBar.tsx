import React from "react"
import TurtleScene from "@data/project/Scene"
import {Segmented} from "antd"


interface SceneEditRightBarProps {
    scene: TurtleScene
}

export default function SceneEditRightBar({scene}: SceneEditRightBarProps) {

    const [active, setActive] = React.useState("Scene")

    return (
        <div
            className={"vstack gap-3"}
            style={{
                padding: "15px"
            }}
        >

            <Segmented<string>
                value={active}
                block
                options={['Scene', "Content"]}
                onChange={(value) => {
                    setActive(value)
                }}
            />

            {
                active === "Scene" && (
                    <_SceneParamsEditView/>
                )
            }
            {
                active === "Content" && (
                    <_ContentEditView/>
                )
            }
        </div>
    )
}

function _SceneParamsEditView({}) {
    return (
        <div>
            Scene
        </div>
    )
}

function _ContentEditView({}) {
    return (
        <div>
            Content
        </div>
    )
}