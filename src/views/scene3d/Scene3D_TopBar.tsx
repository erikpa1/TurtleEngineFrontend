import React from "react";
import TopBar from "@components/TopBar";
import {TopBarTextButton} from "@components/TopBarButton";
import Switch, {Case} from "react-switch-case";
import Scene3D_TBS_Edit from "@views/scene3d/Scene3D_TBS_Edit";
import Scene3D_TBS_Zones from "@views/scene3d/Scene3D_TBS_Zones";
import Scene3D_TBS_AttPoints from "@views/scene3d/Scene3D_TBS_AttPoints";
import Scene3D_TBS_Drawing from "@views/scene3d/Scene3D_TBS_Drawing";
import Scene3D_TBS_Meshes from "@views/scene3d/meshes/Scene3D_TBS_Meshes";
import Scene3D_TBS_Boards from "@views/scene3d/boards/Scene3D_TBS_Boards";

export default function Scene3D_TopBar({}) {

    const [activeTab, setActiveTab] = React.useState("edit")

    return (
        <TopBar>
            <>
                <TopBarTextButton
                    lang={"edit"}
                    isActive={activeTab === "edit"}
                    onClick={() => {
                        setActiveTab("edit")
                    }}
                />
                <TopBarTextButton
                    lang={"meshes"}
                    isActive={activeTab === "meshes"}
                    onClick={() => {
                        setActiveTab("meshes")
                    }}
                />
                <TopBarTextButton
                    lang={"zones"}
                    isActive={activeTab === "zones"}
                    onClick={() => {
                        setActiveTab("zones")
                    }}
                />
                <TopBarTextButton
                    lang={"drawing"}
                    isActive={activeTab === "drawing"}
                    onClick={() => {
                        setActiveTab("drawing")
                    }}
                />
                <TopBarTextButton
                    lang={"attpoints"}
                    isActive={activeTab === "attpoints"}
                    onClick={() => {
                        setActiveTab("attpoints")
                    }}
                />
                <TopBarTextButton
                    lang={"physics"}
                    isActive={activeTab === "physics"}
                    onClick={() => {
                        setActiveTab("physics")
                    }}
                />

                <TopBarTextButton
                    lang={"logiccircuit"}
                    isActive={activeTab === "logiccircuit"}
                    onClick={() => {
                        setActiveTab("logiccircuit")
                    }}
                />

                <TopBarTextButton
                    lang={"boards"}
                    isActive={activeTab === "boards"}
                    onClick={() => {
                        setActiveTab("boards")
                    }}
                />
            </>
            <Switch condition={activeTab}>
                <Case value={"edit"}>
                    <Scene3D_TBS_Edit/>
                </Case>
                <Case value={"meshes"}>
                    <Scene3D_TBS_Meshes/>
                </Case>
                <Case value={"drawing"}>
                    <Scene3D_TBS_Drawing/>
                </Case>
                <Case value={"attpoints"}>
                    <Scene3D_TBS_AttPoints/>
                </Case>
                <Case value={"zones"}>
                    <Scene3D_TBS_Zones/>
                </Case>
                <Case value={"physics"}>
                    Phyisics
                </Case>
                <Case value={"logiccircuit"}>
                    Logic circuits
                </Case>
                <Case value={"boards"}>
                    <Scene3D_TBS_Boards/>
                </Case>
            </Switch>
        </TopBar>

    )
}