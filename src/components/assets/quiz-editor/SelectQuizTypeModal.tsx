import React from "react";
import {TGui} from "@external/tgui";
import {ExamQuestionTypes} from "@platform/assets/exam";
import Asset from "@platform/assets/Asset";
import Assets from "@platform/assets/Assets";
import FsTools from "@api/FsTools";


export default function SelectQuizModal({onSelected, onClose}) {

    const [t] = TGui.T()

    const [category, setCategory] = React.useState(ExamQuestionTypes.SELECTION)

    return (
        <TGui.Modal
            size={"lg"}
            closeEnabled={true}
            onHide={onClose}
            header={<TGui.ModalTitle>{t("create.question")}</TGui.ModalTitle>}
        >
            <TGui.Row style={{padding: "1em"}}>


                <TGui.Col>
                    <TGui.Card>
                        <div className={"vstack gap-2"}>
                            {
                                ExamQuestionTypes.ToArray().map((value) => {
                                    return (
                                        <div key={value}>
                                            <TGui.Typography>
                                                {t(`question.${value}`)}
                                            </TGui.Typography>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                <TGui.Button label={"select"}/>
            </div>


        </TGui.Modal>
    )
}

