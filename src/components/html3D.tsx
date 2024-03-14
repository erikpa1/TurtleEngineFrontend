import {Html} from "@react-three/drei";
import React from "react";
import {Vector3} from "three";


interface DtHtmlViewProps {
    disableTranform?: boolean
    children: any
    position?: [number, number, number] | Vector3
    rotation?: [number, number, number]
}

export default function DtHtmlWrapper({
                                          rotation,
                                          position,
                                          children,
                                          disableTranform
                                      }: DtHtmlViewProps) {
    return (
        <Html
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            transform={!disableTranform}
            center
            zIndexRange={[0, 5]}
            // rotation={[0, 0, 0]}
            className={"prevent-select"}
        >
            <div
                className={"not-draggable"}
                style={{
                    background: "rgba(0, 0, 0, 0)",
                    color: "white",
                    fontSize: "5px",
                    // transform: "translate(-50%)",
                    marginTop: "auto",
                    marginBottom: "auto",
                    padding: "2px",
                    // width: `${pointScale * 5.5}px`,
                    // height: `${pointScale * 5.5}px`,
                    textShadow: "1px 1px 1px #000000",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    textAlign: "left"
                }}>

                {
                    React.Children.toArray(children)
                }

            </div>

        </Html>
    )
}