import ErrorBoundary from "@components/ErrorBoundary";
import React from "react";
import FsTools from "@api/FsTools";
import {Html, Plane} from "@react-three/drei";
import CurvedPlane from "@components/assets/mesh/CurvedPlane";
import * as three from "three"

interface VideoWorldCanvasProps {
    videoPath: string
    nodeUid: string
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


export function CurvedVideoWorldCanvas(props: VideoWorldCanvasProps) {


    const ratio = 16 / 9
    const width = props.scale[0]
    const radius = 2
    const z = 4

    const r = 3

    //  const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])

    return (
        <ErrorBoundary onError={<_ErrorVideoCanvas {...props}/>}>
            <CurvedPlane width={width} height={width / r} radius={radius}>
                <React.Suspense fallback={<meshStandardMaterial side={three.DoubleSide} wireframe/>}>
                    <_VideoMaterial/>
                </React.Suspense>
            </CurvedPlane>
        </ErrorBoundary>
    )
}


function _VideoMaterial({}) {

    // const texture = useVideoTexture(src)
    // texture.wrapS = THREE.RepeatWrapping
    // texture.wrapT = THREE.RepeatWrapping
    // texture.repeat.x = -1
    // texture.offset.x = 1
    //
    // setVideo?.(texture.image)

    return (
        <meshStandardMaterial
            side={three.DoubleSide}
            // map={texture}
            toneMapped={false}
            transparent opacity={0.9}
        />
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
            <Html>
                <video id={props.nodeUid}>
                    <source src={videoPath}/>
                </video>
            </Html>

        </Plane>
    )
}