import React from "react";
import {TGui} from "@external/tgui";
import {SceneVideoNode} from "@platform/scene/media/SceneVideoNode";
import VideoSceneNodeContentEditor from "@components/assets/scene-editor/scene-nodes/VideoSceneNodeOffcanvasContent";
import SceneNodesFactory from "@platform/scene/SceneNodesFactory";


export default function SceneNodeEditOffcanvasDispatcher({onClose, node}) {

    const [t] = TGui.T()

    const CONTENT = SceneNodesFactory.GetEditorContent(node.type)

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