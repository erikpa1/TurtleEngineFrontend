import React from "react";
import {Container, Drawer} from "@mui/material";
import anyEventEmmiter from "@components/AnyEventEmmiter";
import {AllFilesView} from "@views/files/FilesView";

export default function Scene3D_BottomBar({}) {

    return (
        <>
            <_FilesDrawer/>
        </>
    )
}

function _FilesDrawer({}) {

    const [visible, setVisible] = React.useState(false)

    function swapDrawer() {
        setVisible(!visible)
    }


    React.useEffect(() => {
        anyEventEmmiter.on("keydown-ctrl-space", swapDrawer)

        return () => {
            anyEventEmmiter.off("keydown-ctrl-space", swapDrawer)
        }
    })


    return (
        <Drawer
            anchor={"bottom"}
            open={visible}
            onClose={() => setVisible(!visible)}
        >
            <div style={{
                minHeight: "30em",
                padding: "25px"
            }}>
                <AllFilesView/>
            </div>
        </Drawer>
    )
}
