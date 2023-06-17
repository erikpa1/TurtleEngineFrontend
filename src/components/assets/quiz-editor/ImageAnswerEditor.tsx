import React from "react";

import {TGui} from "@external/tgui";
import {Col, Row} from "react-bootstrap";

export default function ImageAnswerEditor({}) {
    return (

        <TGui.Card style={{
            backgroundColor: "gray"
        }}>

            <TGui.CardHeader>


            </TGui.CardHeader>


            <TGui.CardContent>

                <div className={"hstack gap-3"}>
                    <div>{">"}</div>
                    <div>{"<"}</div>
                    <div>{"Delete"}</div>
                </div>

                <div className={"hstack gap-3"}
                     style={{
                         padding: "15px"
                     }}
                >
                    <Row xs={1} md={4} className="g-4">
                        {
                            [0, 1, 2, 3].map((value) => {
                                return (
                                    <Col key={value}>

                                        <TGui.Card>
                                            <TGui.CardContent>
                                                {value}
                                            </TGui.CardContent>
                                        </TGui.Card>
                                    </Col>

                                )
                            })
                        }
                    </Row>

                </div>
            </TGui.CardContent>
        </TGui.Card>
    )
}