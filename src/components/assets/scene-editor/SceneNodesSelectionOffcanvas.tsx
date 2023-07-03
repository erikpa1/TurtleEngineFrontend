import React from "react";
import {TGui} from "@external/tgui";
import HudButton from "@components/assets/HudButton";
import UniversalInputSearchBar from "@components/SearchBar";


interface SceneNodesSelectionOffcanvas {
    onHide: () => void
    onSelect: (asset: any) => void
}


export default function SceneNodesSelectionOffcanvas(props: SceneNodesSelectionOffcanvas) {

    const [t] = TGui.T()

    return (
        <TGui.Offcanvas
            width={"600px"}
            closeEnabled={true}
            onClose={props.onHide}
            header={<TGui.OffcanvasTitle>{t("select.node")}</TGui.OffcanvasTitle>}
        >

            <_SelectionView {...props}/>
        </TGui.Offcanvas>

    )
}


const SCENE_NODES = [
    //World
    ["/icons/Create.Mesh.svg",
        "/icons/Create.Mesh.svg",
        "/icons/Create.Mesh.svg",
        "/icons/Create.Mesh.svg",
        "/icons/Create.Mesh.svg",
        "/icons/Create.Mesh.svg",
    ],
    //Media
    ["/icons/Create.Image.svg",
        "/icons/Create.Sound.svg",
        "/icons/Create.Sound.svg",
        "/icons/Create.Sound.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Video.svg",
        "/icons/Create.Pdf.svg"],
    //Data
    ["/icons/Create.Quiz.svg",
        "/icons/Create.Form.svg",
        "/icons/Create.Form.svg",
        "/icons/Create.Form.svg",
        "/icons/Create.Form.svg"],
    //Physics
    ["/icons/Alchemy.svg",
        "/icons/Layers.svg",
        "/icons/Alchemy.svg",
        "/icons/Layers.svg",
        "/icons/Connections.svg"]
]


function _SelectionView(props: SceneNodesSelectionOffcanvas) {
    return (
        <div>
            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <UniversalInputSearchBar/>
            </div>

            {
                SCENE_NODES.map((value, index) => {

                    return (

                        <div key={index}>


                            <h2>Some category</h2>

                            <TGui.Row xs={1} md={4} className="g-4">

                                {
                                    value.map((val1, index) => {
                                        return (
                                            <TGui.Col key={index}>
                                                <HudButton
                                                    icon={val1}
                                                    lang={val1}
                                                />
                                            </TGui.Col>
                                        )
                                    })
                                }

                            </TGui.Row>

                        </div>
                    )

                })
            }

        </div>
    )
}