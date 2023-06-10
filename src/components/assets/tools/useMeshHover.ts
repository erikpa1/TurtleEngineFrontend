import {useThree} from "@react-three/fiber";


export function useMeshHover(): [any] {

    const {gl} = useThree()

    const _onPointerOver = (event) => {
        gl.domElement.style.cursor = "pointer"
    }
    const _onPointerOut = (event) => {
        gl.domElement.style.cursor = "default"
    }

    return [{
        onPointerOver: _onPointerOver,
        onPointerOut: _onPointerOut
    }]

}