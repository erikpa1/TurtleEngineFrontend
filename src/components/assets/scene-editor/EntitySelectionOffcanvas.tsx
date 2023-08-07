import React from "react";
import {TGui} from "@external/tgui";
import HudButton from "@components/assets/HudButton";
import UniversalInputSearchBar from "@components/SearchBar";
import SceneEntitiesFactory from "@platform/entities/SceneEntitiesFactory";


interface SceneEntitiesSelectionOffcanvas {
    onHide: () => void
    onSelect: (asset: any) => void
}


export default function EntitySelectionOffcanvas(props: SceneEntitiesSelectionOffcanvas) {

    const [t] = TGui.T()

    return (
        <TGui.Offcanvas
            width={"600px"}
            closeEnabled={true}
            onClose={props.onHide}
            header={<TGui.OffcanvasTitle>{t("select.entity")}</TGui.OffcanvasTitle>}
        >
            <_SelectionView {...props}/>
        </TGui.Offcanvas>

    )
}


function _SelectionView(props: SceneEntitiesSelectionOffcanvas) {

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
                Array.from(SceneEntitiesFactory.LIBRARY.entries()).map((value, index) => {

                    return (

                        <TGui.Stack gap={3} key={index}>


                            <h2>{t(value[0])}</h2>

                            <TGui.Stack direction={"horizontal"} gap={3}>

                                {
                                    value[1].map((libEntity, index) => {
                                        return (
                                            <HudButton
                                                key={index}
                                                lang={libEntity.name}
                                                icon={libEntity.icon}
                                                onClick={() => {
                                                    props.onSelect(libEntity)
                                                }}
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