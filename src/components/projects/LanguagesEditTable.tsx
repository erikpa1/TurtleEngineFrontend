import {TGui} from "@external/tgui";
import React from "react";
import {func} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";


interface _LanguagesTableProps {
    langs: Map<string, Map<string, string | null>>
}

export default function LanguagesEditTable({langs}: _LanguagesTableProps) {

    function savePressed() {
        alert("Save languages unimplemented")
    }

    function addKeyPressed() {

    }

    return (
        <>
            <TGui.Stack gap={3} direction={"horizontal"}>
                <TGui.Button
                    label={"save"}
                    onClick={savePressed}
                />
                <TGui.Button
                    label={"add"}
                    onClick={addKeyPressed}
                />

            </TGui.Stack>

        </>
    )
}

function _Table({langs}) {
    return (
        <></>
    )
}