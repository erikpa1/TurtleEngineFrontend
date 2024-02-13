import React from "react"
import Stack from "@mui/material/Stack";
import Skin from "@data/skin";


interface TopBar {
    children?: any
    topDisabled?: boolean
}

export default function TopBar({children, topDisabled}: TopBar) {


    const _children = React.Children.toArray(children)

    return (
        <div style={{
            height: "129px",
            backgroundColor: Skin.ContainerB,
        }}>
            <div style={{
                height: "4px",
                backgroundColor: Skin.ContainerA,
            }}/>
            {
                !topDisabled &&
                <div style={{
                    height: "20px",
                    backgroundColor: Skin.ContainerA,
                }}>
                    <Stack direction={"row"}>
                        {_children[0]}
                    </Stack>
                </div>
            }


            <Stack
                direction={"row"}
                gap={1}
                style={{
                    margin: "5px"
                }}
            >
                {_children[1]}
            </Stack>
        </div>

    )

}