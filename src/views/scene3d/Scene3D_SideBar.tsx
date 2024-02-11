import React from "react";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightSharp from "@mui/icons-material/ChevronRightSharp";
import Stack from "@mui/material/Stack";
import {TopBarTextButton} from "@components/TopBarButton";
import Switch, {Case} from "react-switch-case";
import Scene3D_SB_FilesView from "@views/scene3d/Scene3D_SB_Files";


export default function Scene3D_SideBar({}) {

    const [activeTab, setActiveTab] = React.useState("scene")

    return (

        <div style={{
            position: "relative",
        }}>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }}>
                <Stack>

                    <div
                        style={{
                            height: "25px",
                            background: "#ebebeb"
                        }}
                    >
                        <Stack
                            direction={"row"}
                            style={{marginTop: "4px"}}
                        >
                            <TopBarTextButton
                                isActive={activeTab === "scene"}
                                lang={"scene"}
                                onClick={() => setActiveTab("scene")}
                            />
                            <TopBarTextButton
                                isActive={activeTab === "files"}
                                lang={"files"}
                                onClick={() => setActiveTab("files")}
                            />

                        </Stack>
                    </div>

                    <div style={{
                        position: "relative"
                    }}>
                        <Switch condition={activeTab}>
                            <Case value={"scene"}>
                                <_SceneView/>
                            </Case>
                            <Case value={"files"}>
                                <Scene3D_SB_FilesView/>
                            </Case>
                        </Switch>
                    </div>


                </Stack>
            </div>
        </div>

    )
}


function _FilesView({}) {
    return (
        <>
        </>
    )
}

function _SceneView({}) {
    return (
        <>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightSharp/>}
            >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar"/>
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS"/>
                    <TreeItem nodeId="6" label="MUI">
                        <TreeItem nodeId="8" label="index.js">
                            <Stack direction={"row"}>
                                <input type={"checkbox"}/>
                                <div>Here</div>
                            </Stack>
                        </TreeItem>
                    </TreeItem>

                </TreeItem>
            </TreeView>
        </>
    )
}