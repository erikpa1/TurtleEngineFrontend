import React from "react";
import {TGui} from "@external/tgui";
import {ExamQuestionTypes} from "@platform/assets/exam";
import Asset from "@platform/assets/Asset";
import Assets from "@platform/assets/Assets";
import FsTools from "@api/FsTools";


export default function SelectQuizModal({onSelected, onClose}) {

    const [t] = TGui.T()


    const types = ExamQuestionTypes.ToArray()

    const [type, setType] = React.useState(types[0])

    return (
        <TGui.Modal
            size={"lg"}
            closeEnabled={true}
            onHide={onClose}
            header={<TGui.ModalTitle>{t("create.question")}</TGui.ModalTitle>}
        >
            <TGui.Row style={{padding: "1em"}}>


                <TGui.Col xs={3}>
                    <TGui.Card>

                        <TGui.CardContent>
                            <TGui.ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained button group"
                                variant="text"
                            >
                                {
                                    types.map((value) => {
                                        return (
                                            <TGui.Button
                                                key={value}
                                                label={`question.${value}`}
                                                onClick={() => setType(value)}
                                            />
                                        )
                                    })
                                }
                            </TGui.ButtonGroup>
                        </TGui.CardContent>

                    </TGui.Card>
                </TGui.Col>


                <TGui.Col>
                    <TGui.Card>
                        <TGui.CardMedia
                            sx={{height: 140}}
                            image={FsTools.ConvertFilePath(FsTools.GetPlatformPath("/Images/Question.Text.png"))}
                        />

                        <TGui.CardContent>
                            <TGui.Typography>

                            </TGui.Typography>
                        </TGui.CardContent>

                    </TGui.Card>
                </TGui.Col>
            </TGui.Row>

            <div>
                <TGui.Button
                    label={"select"}
                    onClick={() => {
                        onSelected(type)
                        onClose()
                    }}
                />
            </div>


        </TGui.Modal>
    )
}

