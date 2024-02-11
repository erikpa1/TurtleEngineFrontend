import React from "react";

export default function TopBarWrapper({children, style}) {
    return (
        <div style={{
            width: "100%",
            height: "55px",
            backgroundColor: "black",
            ...(style ?? {})
        }}>
            {
                React.Children.toArray(children)
            }

        </div>
    )
}