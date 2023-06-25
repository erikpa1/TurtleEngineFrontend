import React from "react"
import {Drawer} from "@mui/material"
import {Offcanvas} from "react-bootstrap";


interface TurtleDrawer {
    children: any
    header?: any
    closeEnabled?: boolean
    onClose?: () => void
    width?: string
}

export default function TurtleOffcanvas(props: TurtleDrawer) {

    const drawerStyle = {
        backgroundColor: '#e7ebf0',
        width: props.width ?? "450px"
    };

    return (
        <Offcanvas
            onHide={props.onClose}
            show={true}
            placement={"end"}

            style={{
                margin: "5px",
                ...drawerStyle
            }}

        >

            <Offcanvas.Header className={"custom-white"} closeButton={props.closeEnabled}>
                {
                    props.header
                }
            </Offcanvas.Header>

            <Offcanvas.Body className={"custom-white"}>
                {
                    React.Children.toArray(props.children)

                }
            </Offcanvas.Body>

        </Offcanvas>
    )
}