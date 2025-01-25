import React from "react"
import TurtleScene from "@data/project/Scene"
import {useParams} from "react-router-dom"
import {Spinner} from "react-bootstrap"
import {Button, Flex, Splitter} from "antd"
import ScenesApi from "@api/ScenesApi"
import SceneEditCanvas from "./SceneEditCanvas"
import SceneEditRightBar from "./SceneEditRightBar"
import {TurtleButton} from "@platform/components/TurtleButtons"
import {DownloadOutlined, PlusOutlined, SaveOutlined} from "@ant-design/icons"
import SceneEditorLeftBar from "./SceneEditorLeftBar"


export default function SceneEditorView() {


    const {sceneuid} = useParams()

    const [scene, setScene] = React.useState<TurtleScene | null>(null)

    async function refresh() {
        console.log(sceneuid)
        if (sceneuid) {
            const tmp = await ScenesApi.GetScene(sceneuid)
            console.log(tmp)
            setScene(tmp)
        }
    }

    React.useEffect(() => {
        refresh()
    }, [sceneuid])


    if (scene) {
        return (
            <div>
                <_SceneEditor scene={scene}/>
            </div>
        )
    } else {
        return (<Spinner/>)
    }

}

interface _SceneEditorProps {
    scene: TurtleScene
}


function _SceneEditor({scene}: _SceneEditorProps) {
    return (
        <Splitter
            style={{height: "100vh"}}
        >
            <Splitter.Panel
                defaultSize="80%"
                min="20%"
                max="80%"
                style={{
                    position: "relative"
                }}
            >
                <SceneEditCanvas scene={scene}/>
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: "50%",
                    zIndex: 150
                }}>
                    <_TopBarButtons/>
                </div>
                <div style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    zIndex: 150
                }}>
                    <SceneEditorLeftBar/>
                </div>
            </Splitter.Panel>
            <Splitter.Panel style={{
                background: "white",
            }}>
                <SceneEditRightBar scene={scene}/>
            </Splitter.Panel>
        </Splitter>
    )
}


function _TopBarButtons({}) {

    return (
        <div style={{marginTop: "15px"}}>
            <Flex gap="small" wrap>
                <Button type="primary" icon={<SaveOutlined/>}/>
            </Flex>
        </div>
    )
}

