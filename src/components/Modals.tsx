import React from "react";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {Form, Modal} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Stack} from "@mui/material";
import {TurtleButton} from "@platform/components/TurtleButtons";
import {TGui} from "@external/tgui";


const Modals = {
    TurtleModal: TurtleModal,
    YesNoModal: YesNoModal,
    showYesNoModal: showYesNoModal
}


interface TurtleModalProps {
    children?: any
    size?: any
    header?: any
    closeEnabled?: boolean
    body?: any
    onHide?: () => void
}


export function TurtleModal(props: TurtleModalProps) {

    const children = React.Children.toArray(props.children)

    const style = {
        backgroundColor: '#e7ebf0',
    }

    return (
        <Modal
            show={true}
            size={props.size ?? null}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header
                closeButton={props.closeEnabled}
                style={style}
            >
                {props.header}
            </Modal.Header>

            <Modal.Body
                style={style}
            >{children[0]}</Modal.Body>

            {
                children[1] && <Modal.Footer style={style}>{children[1]}</Modal.Footer>
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


export function showSimpleStringInput(title: string, buttonLang: string, onPicked: any) {
    useGlobalPopup.getState().pushElement(<SimpleStringModal
        onClose={useGlobalPopup.getState().popElement}
        title={title}
        buttonLang={buttonLang}
        onPick={onPicked}
    />)
}


export function SimpleStringModal({title,buttonLang, onPick, onClose}) {

    const [t] = TGui.T()

    const [value, setValue] = React.useState("")

    return (
        <TGui.Modal
            closeEnabled={true}
            onHide={onClose}
            header={<TGui.ModalTitle>{t(title)}</TGui.ModalTitle>}
        >
            <Form.Control
                type={"text"}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}

            />

            <div>
                <TGui.Button
                    label={buttonLang}
                    onClick={() => {
                        onClose()
                        onPick(value)
                    }}
                />
            </div>

        </TGui.Modal>
    )


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

        >
            <div/>
            {
                footer
            }

        </TurtleModal>
    )
}


export default Modals