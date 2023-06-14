import React from "react";
import {TGui} from "@external/tgui";

export default function TextAnswerEditor({}) {
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

                <div className={"vstack gap-3"}
                     style={{
                         padding: "15px"
                     }}
                >
                    {
                        [0, 1, 2].map((value) => {
                            return (
                                <div>{value}</div>
                            )
                        })
                    }
                </div>
            </TGui.CardContent>
        </TGui.Card>


    )
}