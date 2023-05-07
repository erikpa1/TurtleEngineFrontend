import React from "react"
import {Drawer} from "@mui/material"


interface TurtleDrawer {
    children: any
    onClose?: () => void
    width?: string
}

export default function TurtleDrawer({
                                         children,
                                         onClose,
                                         width
                                     }: TurtleDrawer) {

    const drawerStyle = {
        backgroundColor: '#e7ebf0',
        width: width ? width : "450px"
    };

    return (
        <Drawer
            open={true}
            onClose={onClose}
            anchor={"right"}


            PaperProps={{style: drawerStyle}}

        >
            {
                React.Children.toArray(children)
            }

        </Drawer>
    )
}