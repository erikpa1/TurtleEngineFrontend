import React from "react";


interface AssetEditorHudProps {
    children: any
    placement: "bottom" | "top" | "left" | "right"
}


export function AssetEditorHud({children, placement}: AssetEditorHudProps) {

    return (
        <div style={{
            position: "absolute",
            ..._position(placement),
        }}>
            <div className={_stack(placement)}>
                {
                    React.Children.toArray(children)
                }
            </div>


        </div>
    )
}

function _stack(placement: string) {
    if (placement === "bottom" || placement === "top") {
        return "hstack gap-3"
    } else {
        return "vstack gap-3"
    }
}


function _position(placement: string): any {

    const OFFSET = "10px"


    if (placement === "bottom") {

        return {
            bottom: OFFSET,
            left: "50%",
            transform: "translate(-50%)"
        }
    } else if (placement === "top") {

        return {
            top: OFFSET,
            left: "50%",
            transform: "translate(-50%)"
        }
    } else if (placement === "left") {
        return {
            top: "50%",
            left: OFFSET,
            transform: "translate(0%, -50%)"
        }
    } else if (placement === "right") {
        return {
            top: "50%",
            right: OFFSET,
            transform: "translate(0%, -50%)"
        }
    }
}