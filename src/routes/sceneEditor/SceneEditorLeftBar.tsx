import {Button, Flex} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import React from "react"
import TurtleOffcanvas from "@components/Drawers"
import {Modal, Offcanvas} from "react-bootstrap"
import {TGui} from "@external/tgui"
import {TurtleModal} from "@components/Modals"


export default function SceneEditorLeftBar({}) {

    return (
        <div style={{marginLeft: "15px"}}>
            <Flex gap="small" wrap>
                <_Create/>
            </Flex>
        </div>
    )
}

function _Create() {

    const [t] = TGui.T()

    const [visible, setVisible] = React.useState(false)

    return (
        <>
            <Button
                type="primary"
                onClick={() => setVisible(true)}
                icon={<PlusOutlined/>}
            />

            {
                visible &&
                <TurtleModal
                    onHide={() => setVisible(false)}
                    header={<Offcanvas.Title>{t("project.edit")}</Offcanvas.Title>}
                    closeEnabled={true}
                >

                    <div>
                        Here
                    </div>

                </TurtleModal>
            }


        </>
    )
}