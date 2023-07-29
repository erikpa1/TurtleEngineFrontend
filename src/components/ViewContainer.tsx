import React from "react";

import {Container} from "react-bootstrap";


interface ViewContainerProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
};


export function ViewContainer({children, style}: ViewContainerProps) {

    const _style = style ?? {}

    return (
        <Container style={{
            padding: "55px",

            ..._style
        }}>
            {
                React.Children.toArray(children)
            }
        </Container>
    )
}

export function BigViewContainer({children, style}: ViewContainerProps) {

    const _style = style ?? {}

    return (
        <Container style={{
            padding: "15px",
            paddingTop: "55px",

            ..._style
        }}>
            {
                React.Children.toArray(children)
            }
        </Container>
    )
}