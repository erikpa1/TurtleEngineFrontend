import React from "react"
import Stack from "@mui/material/Stack";


interface TopBar {
    children?: any
    topDisabled?: boolean
}

export default function TopBar({children, topDisabled}: TopBar) {


    const _children = React.Children.toArray(children)

    return (
        <div style={{
            height: "129px",
            backgroundColor: "#f6f6f6",
        }}>
            <div style={{
                height: "4px",
                backgroundColor: "#ebebeb"
            }}/>
            {
                !topDisabled &&
                <div style={{
                    height: "20px",
                    backgroundColor: "#ebebeb"
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