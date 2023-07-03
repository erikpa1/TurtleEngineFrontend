import ErrorBoundary from "@components/ErrorBoundary";
import {ErrorMesh} from "@components/assets/mesh/ErrorMesh";
import React from "react";
import FsTools from "@api/FsTools";
import {Plane, useGLTF} from "@react-three/drei";

interface VideoWorldCanvasProps {
    videoPath: string
    position?: [number, number, number] | any
    rotation?: [number, number, number] | any
    scale?: [number, number, number] | any
}

export function VideoWorldCanvas(props: VideoWorldCanvasProps) {
    return (
        <ErrorBoundary onError={<_ErrorVideoCanvas {...props}/>}>
            <_VideoCanvas {...props}/>
        </ErrorBoundary>
    )
}


function _ErrorVideoCanvas(props: VideoWorldCanvasProps) {
    return (
        <Plane
            position={props.position ?? [0, 0, 0]}
            scale={props.scale ?? [1, 1, 1]}
            rotation={props.rotation ?? [0, 0, 0]}
        >

        </Plane>
    )
}


function _VideoCanvas(props: VideoWorldCanvasProps) {

    const videoPath = FsTools.ConvertFilePath(props.videoPath)

    return (
        <Plane
            position={props.position ?? [0, 0, 0]}
            scale={props.scale ?? [1, 1, 1]}
            rotation={props.rotation ?? [0, 0, 0]}
        >

        </Plane>
    )
}