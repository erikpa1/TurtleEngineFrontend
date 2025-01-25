import React from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {useGLTF, Stage, Grid, OrbitControls, Environment, MapControls} from '@react-three/drei'
import {EffectComposer, Bloom, ToneMapping, N8AO} from '@react-three/postprocessing'


import KamdoFiber from "@TurtleApp/Rendering/KamdoFiber"
import GobotFiber from "@TurtleApp/Rendering/GobotFiber"
import ErrorBoundary from "@Turtle/Components/ErrorBoundary";
import TurtleFiber from "@TurtleApp/Rendering/TurtleFiber";
import EnvFiber from "@Turtle/World/EnvFiber";


export default function RenderingView() {

    const parent = React.useRef<any>()

    return (
        <div>
            <React.Suspense>
                <ErrorBoundary>
                    <_RenderingView parent={parent}/>
                    {/*<KauflandRendering parent={parent}/>*/}
                </ErrorBoundary>
            </React.Suspense>

            <div
                ref={parent}
                style={{
                    position: "absolute",
                    right: "50%",
                    top: "50%px",
                }}
            />
        </div>

    )
}

function _RenderingView({parent}) {
    useGLTF.preload('/meshes/kamando.glb')

    return (
        <Canvas
            style={{
                height: "100vh",
            }}

            flat
            shadows
            gl={{logarithmicDepthBuffer: true}}
            camera={{position: [-10, 0, 5], fov: 25}}>


            <fog attach="fog" args={['black', 15, 22.5]}/>


            <Stage intensity={0.5}
                   environment="city"
                   shadows={{type: 'accumulative', bias: -0.001, intensity: Math.PI}}
                   adjustCamera={false}>
                <KamdoFiber rotation={[0, Math.PI, 0]}/>
                {/*<GobotFiber rotation={[0, Math.PI, 0]} position={[-3, 0, 0]}/>*/}
                {/*<TurtleFiber position={[3, 2, 0]} scale={[3, 3, 3]}/>*/}
            </Stage>


            <Grid renderOrder={-1}
                  position={[0, -1.85, 0]}
                  infiniteGrid cellSize={0.6}
                  cellThickness={0.6}
                  sectionSize={3.3}
                  sectionThickness={1.5}
                  sectionColor={[0.5, 0.5, 10] as any}
                  fadeDistance={30}/>

            <MapControls
                makeDefault
                enableDamping={false}
            />

            <EffectComposer>
                <Bloom luminanceThreshold={2} mipmapBlur/>
                <ToneMapping/>
                {/*<N8AO color="green" aoRadius={2} intensity={1.15}/>*/}
            </EffectComposer>

            <EnvFiber/>

        </Canvas>
    )
}


