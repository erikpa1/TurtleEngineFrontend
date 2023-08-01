import React from "react";
import {TGui} from "@external/tgui";
import {VideoEntity} from "@platform/entities/media/VideoEntity";
import VideoSceneNodeContentEditor from "@components/assets/scene-editor/scene-nodes/VideoSceneNodeOffcanvasContent";
import SceneEntitiesFactory from "@platform/entities/SceneEntitiesFactory";


export default function SceneNodeEditOffcanvasDispatcher({onClose, node}) {

    const [t] = TGui.T()

    const CONTENT = SceneEntitiesFactory.GetEditorContent(node.type)

    return (
        <TGui.Offcanvas
            header={<TGui.OffcanvasTitle>{t("edit")}</TGui.OffcanvasTitle>}
            closeEnabled
            onClose={onClose}
        >
            <CONTENT node={node}/>
        </TGui.Offcanvas>
    )

}