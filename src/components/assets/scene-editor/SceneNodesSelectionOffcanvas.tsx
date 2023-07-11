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

    //Physics
    {
        name: "physics",
        values: [
            ["physics.plane", "/icons/Alchemy.svg"],
            ["physics.avatar", "/icons/Alchemy.svg"],
            ["physics.box", "/icons/Alchemy.svg"],
            ["physics.sphere", "/icons/Alchemy.svg"],
            ["physics.cylinder", "/icons/Alchemy.svg"],
        ]
    },

    {
        name: "Media",
        values: [
            ["media.video", "/icons/Alchemy.svg"],
            ["media.document", "/icons/Alchemy.svg"],
            ["media.audio", "/icons/Alchemy.svg"],
        ]
    },

    {
        name: "Data",
        values: [
            ["media.video", "/icons/Alchemy.svg"],
            ["media.document", "/icons/Alchemy.svg"],
            ["media.audio", "/icons/Alchemy.svg"],
            ["media.audio", "/icons/Alchemy.svg"],
            ["media.audio", "/icons/Alchemy.svg"],
        ]
    }


]


function _SelectionView(props: SceneNodesSelectionOffcanvas) {

    const [t] = TGui.T()

    return (
        <TGui.Stack gap={3}>
            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <UniversalInputSearchBar/>
            </div>

            {
                SCENE_NODES.map((value, index) => {

                    return (

                        <TGui.Stack gap={3} key={index}>


                            <h2>{t(value.name)}</h2>

                            <TGui.Stack direction={"horizontal"} gap={3}>

                                {
                                    value.values.map((val1, index) => {
                                        return (
                                            <HudButton
                                                key={index}
                                                lang={val1[0]}
                                                icon={val1[1]}
                                            />
                                        )
                                    })
                                }

                            </TGui.Stack>

                        </TGui.Stack>
                    )

                })
            }

        </TGui.Stack>
    )
}