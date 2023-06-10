import {GizmoHelper, GizmoViewport} from "@react-three/drei";


export default function SceneCameraRotationGizmo() {
    return (
        <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
        >
            <GizmoViewport axisColors={['red', '#34eb37', '#347deb']} labelColor="black"/>
            {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>

    )
}