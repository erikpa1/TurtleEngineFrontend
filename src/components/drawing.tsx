import React from "react"
import {Box, Line, Plane} from "@react-three/drei";
import DtHtmlWrapper from "./html3D";
import * as three from "three";
import {ThreeEvent} from "@react-three/fiber";


interface Pick2DProps {
    onPicked?: (rect: [number, number]) => void
    onPickedE?: (e: ThreeEvent<PointerEvent>) => void
}

export class DrawSquare {

    a = [0, 0]
    b = [0, 0]

    position = [0, 0, 0]
    scale = [1, 1, 1]
    color = "#ffffff"

    FromRect(rec: Array<number>) {
        this.a = [rec[0], rec[1]]
        this.b = [rec[2], rec[3]]

        const scaleX = Math.abs(rec[0] - rec[2])
        const scaleY = Math.abs(rec[1] - rec[3])

        this.position[0] = rec[0] + (scaleX * 0.5)
        this.position[2] = rec[1] - (scaleY * 0.5)
        this.scale[0] = scaleX
        this.scale[2] = scaleY
    }

}


export function Pick2D({onPicked, onPickedE}: Pick2DProps) {

    const [cursorPos, setCursorPos] = React.useState([0, 0, 0])

    return (
        <group>
            <Plane
                visible={false}
                scale={[10000, 10000, 1]}
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerMove={(e) => {
                    const point = e.point
                    setCursorPos([point.x, 0.05, point.z])

                }}
                onClick={(e) => {
                    if (onPicked) {
                        e.stopPropagation()
                        const point = e.point
                        onPicked([point.x, point.z])
                    }

                    if (onPickedE) {
                        onPickedE(e as any)
                    }
                }}
            />


            <HoveringCursor position={cursorPos}/>
        </group>
    )
}

interface Drawing2DCanvasProps {
    onPicked: (rect: [number, number, number, number]) => void
}

export function Drawing2DCanvas({onPicked}: Drawing2DCanvasProps) {

    const [cursorPos, setCursorPos] = React.useState([0, 0.05, 0])

    const [status, setStatus] = React.useState(0)

    const [x1, setX1] = React.useState(0)
    const [y1, setY1] = React.useState(0)

    const [x2, setX2] = React.useState(0)
    const [y2, setY2] = React.useState(0)

    React.useEffect(() => {
        setStatus(0)
        setX1(0)
        setY1(0)
        setX2(0)
        setY2(0)
    }, [])

    return (
        <group>
            <Plane
                visible={false}
                scale={[10000, 10000, 1]}
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerMove={(e) => {
                    const point = e.point
                    setCursorPos([point.x, 0.05, point.z])

                    if (status === 0 || status === 1) {
                        setX2(point.x)
                        setY2(point.z)
                    }
                }}
                onClick={(e) => {

                    const point = e.point
                    if (status === 0) {
                        setX1(point.x)
                        setY1(point.z)
                        setStatus(1)
                    } else if (status === 1) {
                        setStatus(2)
                        onPicked([x1, y1, x2, y2])
                    } else if (status === 2) {
                        setX1(point.x)
                        setY1(point.z)
                        setStatus(1)
                    }
                }}
            />

            {
                status > 0 &&
                <RectangleDrawing
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    color={"red"}
                />
            }

            <HoveringCursor position={cursorPos}/>

        </group>
    )
}

interface RectangleModuleProps {
    overallY?: number
    x1: number
    y1: number
    x2: number
    y2: number
    color: string
    showDimensions?: boolean
    m2Price?: number

}

interface RectangleDrawingFromDrawSquareProps {
    overallY?: number
    square: DrawSquare
    showDimensions?: boolean
    m2Price?: number
}


export function RectangleDrawingFromDrawSquare({square, m2Price, overallY}: RectangleDrawingFromDrawSquareProps) {
    return (
        <RectangleDrawing
            x1={square.a[0]}
            y1={square.a[1]}
            x2={square.b[0]}
            y2={square.b[1]}
            color={square.color}
        />
    )
}


export function RectangleDrawing({x1, y1, x2, y2, m2Price, overallY, color}: RectangleModuleProps) {

    const _m2price = m2Price ?? 0

    const oy = overallY ?? 0.05

    const bottom_position = new three.Vector3();
    const left_bottom = new three.Vector3(x1, 0, y1)
    const right_bottom = new three.Vector3(x2, 0, y1)
    const right_top = new three.Vector3(x2, 0, y2)

    bottom_position.lerpVectors(left_bottom, right_bottom, 0.5);

    const left_position = new three.Vector3();
    const left_top = new three.Vector3(x1, 0, y2)
    left_position.lerpVectors(left_bottom, left_top, 0.5);

    const middle = new three.Vector3()
    middle.lerpVectors(left_bottom, right_top, 0.5);

    const distanceA = left_bottom.distanceTo(right_bottom)
    const distanceB = left_bottom.distanceTo(left_top)
    const distanceMiddle = left_bottom.distanceTo(right_top)

    return (
        <>
            <Line renderOrder={999}
                  points={[

                      [x1, oy, y1],
                      [x1, oy, y2],
                      [x2, oy, y2],
                      [x2, oy, y1],
                      [x1, oy, y1],
                      [x2, oy, y2],


                  ]} color={color}/>

            <DtHtmlWrapper
                position={[left_top.x, 0, left_top.z - 1]}
                rotation={[Math.PI / -2, 0, 0]}
                disableTranform
            >
                <div
                    style={{pointerEvents: "none"}}>

                    <div
                        className={"hstack gap-1"}
                    >
                        <div
                            style={{
                                color: "white",
                                fontSize: "10px"
                            }}
                        >
                            {(distanceA * distanceB).toPrecision(4)}
                        </div>
                        <div
                            style={{
                                color: "white",
                                fontSize: "10px",
                                pointerEvents: "none"
                            }}
                        >m<sup>2</sup></div>
                    </div>

                    {
                        _m2price !== 0 &&
                        <div
                            style={{
                                color: "white",
                                fontSize: "10px"
                            }}
                        >
                            {(distanceA * distanceB).toPrecision(4)} €
                        </div>
                    }


                </div>


            </DtHtmlWrapper>


            <DtHtmlWrapper
                position={bottom_position}
                rotation={[Math.PI / -2, 0, 0]}
                disableTranform
            >
                <div
                    style={{
                        color: "white",
                        fontSize: "10px",
                        pointerEvents: "none"
                    }}
                >{distanceA.toPrecision(4)}</div>
            </DtHtmlWrapper>

            <DtHtmlWrapper
                position={left_position}
                rotation={[Math.PI / -2, 0, 0]}
                disableTranform
            >
                <div
                    style={{
                        color: "white",
                        fontSize: "10px",
                        pointerEvents: "none"
                    }}
                >{distanceB.toPrecision(4)}</div>
            </DtHtmlWrapper>

            <DtHtmlWrapper
                position={middle}
                rotation={[Math.PI / -2, 0, 0]}
                disableTranform
            >
                <div
                    style={{
                        color: "white",
                        fontSize: "10px",
                        pointerEvents: "none"
                    }}
                >{distanceMiddle.toPrecision(4)}</div>
            </DtHtmlWrapper>
        </>
    )
}


export function HoveringCursor({position}) {
    return (
        <group position={position}>
            <Line

                depthTest={false}
                renderOrder={999}
                points={[
                    [-0.5, 0, 0],
                    [0.5, 0, 0]
                ]}
                color={"red"}/>

            <Line
                depthTest={false}
                renderOrder={999}
                points={[
                    [0, 0, -0.5],
                    [0, 0, 0.5]
                ]}
                color={"blue"}/>

        </group>
    )
}

interface CrossMarkerProps {
    position?: Array<number>
    onSelect?: (e: any) => void
}

export function CrossMarker({position, onSelect}: CrossMarkerProps) {
    return (
        <group position={position as any ?? [0, 0, 0]}>
            <Line
                depthTest={false}
                renderOrder={999}
                points={[
                    [-0.5, 0, 0],
                    [0.5, 0, 0],
                    [0, 0, 0],
                    [0, 0, -0.5],
                    [0, 0, 0.5]
                ]}
                color={"green"}/>

            {
                onSelect &&
                <Plane
                    visible={false}
                    rotation={[-Math.PI / 2, 0, 0]}
                    onClick={onSelect}
                />
            }

        </group>
    )
}

interface Box3DProps {
    position?: Array<number>
    scale?: Array<number>
    color: string
    offset?: Array<number>
    onSelect?: (e: any) => void
    hidden?: boolean
}


export function Box3D({position, hidden, onSelect, offset, scale, color}: Box3DProps) {

    const _origin = offset ?? [0, 0, 0]
    const _position = position ?? [0, 0, 0]
    const _scale = scale ?? [1, 1, 1]

    return (
        <group
            position={_position as any}
            scale={_scale as any}
            visible={!hidden}
        >
            <group position={_origin as any}>
                <Box visible={false} onClick={onSelect}/>
                {
                    !hidden && <>
                        <Line
                            depthTest={false}
                            renderOrder={999}
                            points={[
                                [0.5, -0.5, -0.5],
                                [0.5, 0.5, -0.5]
                            ]} color={color}/>

                        <Line
                            depthTest={false}
                            renderOrder={999}
                            points={[
                                [-0.5, -0.5, 0.5],
                                [-0.5, 0.5, 0.5]
                            ]} color={color}/>

                        <Line
                            depthTest={false}
                            renderOrder={999}
                            points={[
                                [-0.5, -0.5, -0.5],
                                [-0.5, 0.5, -0.5]
                            ]} color={color}/>

                        <Line
                            depthTest={false}
                            renderOrder={999}
                            points={[
                                [0.5, -0.5, 0.5],
                                [0.5, -0.5, -0.5],
                                [-0.5, -0.5, -0.5],
                                [-0.5, -0.5, 0.5],
                                [0.5, -0.5, 0.5],
                                [0.5, 0.5, 0.5],
                                //Horne hrany
                                [-0.5, 0.5, 0.5],
                                [0.5, 0.5, 0.5],
                                [0.5, 0.5, -0.5],
                                [-0.5, 0.5, -0.5],
                                [-0.5, 0.5, 0.5],
                            ]} color={color}/>

                    </>
                }

            </group>
        </group>
    )

}

export function Square({position, hidden, onSelect, scale, color}: Box3DProps) {

    const _position = position ?? [0, 0, 0]
    const _scale = scale ?? [1, 1, 1]

    return (
        <group
            position={_position as any}
            scale={_scale as any}
            visible={!hidden}
        >
            <group>
                <Box visible={false} onClick={onSelect}/>
                {
                    !hidden && <>
                        <Line
                            depthTest={false}
                            renderOrder={999}
                            points={[
                                [-0.5, 0, 0.5],
                                [0.5, 0, 0.5],
                                [0.5, 0, -0.5],
                                [-0.5, 0, -0.5],
                                [-0.5, 0, 0.5],
                            ]} color={color}/>
                    </>
                }

            </group>
        </group>
    )

}