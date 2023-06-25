import React from "react";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import {TurtleButton} from "@platform/components/TurtleButtons";


const Modals = {
    TurtleModal: TurtleModal,
    YesNoModal: YesNoModal,
    showYesNoModal: showYesNoModal
}


interface TurtleModalProps {
    header?: any
    closeEnabled?: boolean
    body?: any
    footer?: any
    onHide?: () => void
}

export function TurtleModal(props: TurtleModalProps) {
    return (
        <Modal
            show={true}

            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton={props.closeEnabled}>{props.header}</Modal.Header>
            {
                props.body && <Modal.Body>{props.body}</Modal.Body>
            }
            {
                props.footer && <Modal.Footer>{props.footer}</Modal.Footer>
            }

        </Modal>
    )
}


interface YesNoModalProps {
    lang?: string
    onYes?: () => void
    onNo?: () => void
}


function showYesNoModal(props: YesNoModalProps) {
    useGlobalPopup.getState().pushElement(<YesNoModal
        lang={props.lang}
        onYes={() => {
            useGlobalPopup.getState().popElement()
            if (props.onYes) {
                props.onYes()
            }
        }}

        onNo={() => {
            useGlobalPopup.getState().popElement()
            if (props.onNo) {
                props.onNo()
            }

        }}


    />)
}

export function YesNoModal(props: YesNoModalProps) {

    const [t] = useTranslation()

    const _lang = props.lang || ""

    const footer = (
        <Stack direction={"row"} gap={2}>
            <TurtleButton
                variant={"contained"}
                color={"error"}
                label={"no"}
                onClick={props.onNo}
            />
            <TurtleButton
                variant={"contained"}
                label={"yes"}
                onClick={props.onYes}
            />

        </Stack>
    )

    return (
        <TurtleModal
            onHide={props.onNo}
            closeEnabled={true}
            header={<Modal.Title>{t("confirm")}</Modal.Title>}
            body={<>{t(_lang)}</>}
            footer={footer}

        />
    )
}


export default Modals