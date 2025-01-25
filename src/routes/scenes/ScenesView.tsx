import React from "react";
import {useTranslation} from "react-i18next"

import {Ext} from "@external/prelude"

import ProjectUniversalCard from "@components/projects/ProjectUniversalCard"

import {Col, Offcanvas, Row, Spinner} from "react-bootstrap"

import UniversalInputSearchBar from "@components/SearchBar"

import {useAvailableProjects} from "@hooks/projectHooks"

import {useGlobalPopup} from "@platform/zustands/globalPopupZus"

import {TurtleButton} from "@platform/components/TurtleButtons"

import {TGui} from "@external/tgui"
import TurtleScene from "@data/project/Scene"
import ScenesApi from "@api/ScenesApi"
import {useParams} from "react-router-dom"
import SceneCard from "./SceneCard"
import CreateSceneOffcanvas from "@editors/appmanagement/assets/create/CreateOrEditScene"
import CreateProjectOffcanvas from "../projects/CreateProjectOffcanvas"
import TurtleOffcanvas from "@components/Drawers"
import {Stack} from "@mui/material"
import create from "zustand"


export default function ScenesView({}) {

    const {projectuid} = useParams()

    const [t] = useTranslation()

    const [isLoading, setIsLoaing] = React.useState(true)

    const [scenes, setScenes] = React.useState<Array<TurtleScene>>([])

    const [createShow, setCreateShow] = React.useState(false)

    const popupZus = useGlobalPopup()

    async function refresh() {
        setIsLoaing(true)
        setScenes(await ScenesApi.ListScenes(projectuid as any))
        setIsLoaing(false)

    }

    React.useEffect(() => {
        refresh()
    }, [])

    if (isLoading) {
        return (
            <Spinner/>
        )
    } else {
        return (
            <>
                <div className={"vstack gap-2"}>

                    <div className={"hstack gap-1"}>


                        <UniversalInputSearchBar placeHolder={"search"}/>

                        <div
                            className={"hstack gap-3"} style={{
                            marginLeft: "auto"
                        }}>
                            <div style={{
                                marginLeft: "auto",
                                marginRight: "auto"
                            }}>
                                <TurtleButton
                                    onClick={() => {
                                        setCreateShow(true)
                                    }}
                                    label={"create"}

                                />
                            </div>
                        </div>

                    </div>


                    <TGui.Row xs={1} md={4} className="g-4">

                        {
                            scenes.map((value) => {
                                return (
                                    <Col key={value.uid}>
                                        <SceneCard
                                            scene={value}
                                            onEdit={() => {
                                                alert("Unimplemented")
                                            }}/>
                                    </Col>
                                )
                            })
                        }

                    </TGui.Row>


                </div>


                {
                    createShow &&
                    <TurtleOffcanvas
                        onClose={() => {

                        }}
                        closeEnabled={true}
                        header={<Offcanvas.Title>
                            {t("create")}: <b style={{textTransform: "uppercase"}}>{t("scene")}:</b>
                        </Offcanvas.Title>}
                    >
                        <TGui.Box>
                            <Stack spacing={2}>
                                <CreateSceneOffcanvas
                                    onClose={() =>setCreateShow(false)}
                                    onRefresh={refresh}
                                />
                            </Stack>
                        </TGui.Box>

                    </TurtleOffcanvas>
                }

            </>


        )
    }


}

