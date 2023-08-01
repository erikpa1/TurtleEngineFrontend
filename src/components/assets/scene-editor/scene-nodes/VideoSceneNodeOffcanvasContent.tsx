import React from "react"
import {VideoEntity} from "@platform/entities/media/VideoEntity";
import {TGui} from "@external/tgui";


interface _VideoSceneNodeContentEditorProps {
    node: VideoEntity
}

export default function VideoSceneNodeContentEditor({node}: _VideoSceneNodeContentEditorProps) {


    return (
        <TGui.Stack>

            <_BoolEditrPrototype obj={node} value={"looping"}/>
            <_BoolEditrPrototype obj={node} value={"muted"}/>
            <_BoolEditrPrototype obj={node} value={"auto_play"}/>
            <_BoolEditrPrototype obj={node} value={"progress_enabled"}/>
            <_BoolEditrPrototype obj={node} value={"controls_enabled"}/>
            <_BoolEditrPrototype obj={node} value={"pre_play_preview"}/>
            <_PlaneSelection obj={node}/>
        </TGui.Stack>
    )
}


function _BoolEditrPrototype({obj, value}) {


    const [checked, setChecked] = React.useState(obj[value])


    function changed() {
        const newVal = !obj[value]
        obj[value] = newVal
        setChecked(newVal)

        obj.onChange?.()


    }

    return (
        <TGui.Stack direction={"horizontal"}>
            <TGui.Typography style={{marginLeft: "auto"}}>
                {value}:
            </TGui.Typography>
            <TGui.BtnSwitch checked={checked} onChange={changed}/>
        </TGui.Stack>
    )
}


function _PlaneSelection({obj}: { obj: VideoEntity }) {

    const actual = obj.view_mesh
    const newOne = obj.view_mesh === "plane" ? "curved_plane" : "plane"

    function changed() {
        obj.view_mesh = newOne
        obj.onChanged("view_mesh")
    }

    return (
        <TGui.Button
            onClick={changed}
            label={"plane"}

        />
    )
}
