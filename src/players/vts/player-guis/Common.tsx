import {TGui} from "@external/tgui";
import React from "react";

interface VtsPanelHeadingProps {
    icon?: string
    text: string
}

export function VtsPanelHeading({icon, text}: VtsPanelHeadingProps) {

    const [t] = TGui.T()

    return (
        <TGui.Stack direction={"horizontal"}>

            {
                icon && <TGui.IconClickButton
                    image={icon}
                />
            }


            <h4 style={{
                marginLeft: "0.5em",
                marginTop: "0.25em"
            }}>
                {text}
            </h4>
        </TGui.Stack>
    )
}