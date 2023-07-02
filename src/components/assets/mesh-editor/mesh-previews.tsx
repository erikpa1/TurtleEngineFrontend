import React from "react";
import {
    UniversalMeshCanvas,
    UniversalMeshOrbitControls,
    UniversalWorldEnvironment
} from "@components/assets/canvases/UniversalMeshCanvas";

import {TGui} from "@external/tgui";
import {PrimitiveMesh} from "@components/assets/mesh/PrimitiveMesh";
import FsTools from "@api/FsTools";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {OrbitControls} from "@react-three/drei";


interface FileMeshPreviewProps {
    defaultMeshPath?: string
    expectedExtension: string

    onMeshSelectWeb?: (file: File) => void
    onMeshSelectDesktop?: (path: string) => void
    style?: React.CSSProperties
}

export default function MeshFilePickView(props: FileMeshPreviewProps) {

    const [t] = TGui.T()

    const inputRef = React.useRef<any>()

    const [meshPath, setMeshPath] = React.useState(props.defaultMeshPath ?? FsTools.GetPlatformPath("Meshes/Default.glb"))

    function selectMeshPressed() {
        if (PlatformDispatcher.IsDesktop()) {
            PlatformDispatcher.OpenSingleMeshDialog(props.expectedExtension).then((filePath) => {

                if (filePath !== "") {
                    setMeshPath(filePath)

                    if (props.onMeshSelectDesktop) {
                        props.onMeshSelectDesktop(filePath)
                    }
                }


            })
        } else {
            const curr: any = inputRef.current
            curr.click()
        }
    }


    return (
        <div>
            <TGui.Box
                sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
                style={{
                    padding: "5px"
                }}
            >
                <UniversalMeshCanvas

                    preserveDrawingBuffer={true}

                    style={{
                        height: "250px"
                    }}>
                    <UniversalWorldEnvironment/>


                    <UniversalMeshOrbitControls/>

                    <PrimitiveMesh meshPath={meshPath}/>
                </UniversalMeshCanvas>

                <TGui.Button label={t("select")} onClick={selectMeshPressed}/>

                <input
                    ref={inputRef}
                    onChange={selectMeshPressed}
                    type={"file"}
                    hidden
                />
            </TGui.Box>
        </div>


    )

}