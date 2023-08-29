import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import TraningDefinition from "@data/vts/TrainingDefinition";
import {TGui} from "@external/tgui";

import TrainingsApi from "@api/TraningsApi"
import FsTools from "@api/FsTools";
import {useNavigate} from "react-router-dom";

export default function VtsTrainingsView({}) {


    const [tranings, setTranings] = React.useState<Array<TraningDefinition> | null>(null)

    React.useEffect(() => {

        TrainingsApi.GetTrainings().then((value) => {
            setTranings(value)

        })

    }, [])


    if (tranings) {
        return (
            <ViewContainer>
                <_TrainingsList trainings={tranings}/>
            </ViewContainer>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}


function _TrainingsList({trainings}: { trainings: Array<TraningDefinition> }) {


    const navigate = useNavigate()

    return (
        <TGui.Row xs={1} md={4} className="g-4">

            {
                trainings.map((value) => {
                    return (
                        <TGui.Col key={value.uid}>
                            <TGui.Card>
                                <TGui.CardMedia
                                    sx={{height: 140}}
                                    // image={FsTools.ConvertFilePath(FsTools.GetPlatformPath("/Images/Question.Text.png"))}
                                    image={FsTools.ConvertFilePath(value.image)}
                                    onClick={() => {
                                        navigate(`/levels`)
                                    }}
                                    style={{cursor: "pointer"}}
                                />
                                <TGui.CardContent>
                                    <TGui.Typography>
                                        {value.lang}
                                    </TGui.Typography>
                                    <TGui.TextMicro>
                                        {value.description}
                                    </TGui.TextMicro>
                                </TGui.CardContent>

                                <TGui.CardActions>
                                    <TGui.Button
                                        label={"open"}
                                        onClick={() => {
                                            navigate(`/levels`)
                                        }}
                                    />
                                </TGui.CardActions>

                            </TGui.Card>
                        </TGui.Col>
                    )
                })
            }
        </TGui.Row>
    )
}