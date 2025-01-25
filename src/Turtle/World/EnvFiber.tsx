import {Environment} from "@react-three/drei";
import React from "react";
import {useGraphicsSettings} from "@Turtle/GraphicsSettings/graphicsSeetingsZus";


export default function EnvFiber() {

    const {data} = useGraphicsSettings()

    return (
        <Environment
            background={data.env_background}
            files={`/hdrs/${data.env_preset}`}
            blur={data.env_blur}
        />

    )
}