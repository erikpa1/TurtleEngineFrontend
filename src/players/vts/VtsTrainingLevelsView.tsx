import React from "react";
import {ViewContainer} from "@components/ViewContainer";
import TraningDefinition from "@data/vts/TrainingDefinition";
import TraningLevelDefinition from "@data/vts/TraningLevelDefinition";

import {TGui} from "@external/tgui";

import FsTools from "@api/FsTools";

import TrainingsApi from "@api/TraningsApi"

export default function VtsTrainingLevelsView({}) {

    const [levels, setLevels] = React.useState<Array<TraningLevelDefinition> | null>(null)

    React.useEffect(() => {
        TrainingsApi.GetTrainingLevelsOf({}).then((value) => {
            setLevels(value)
        })
    }, [])


    if (levels) {
        return (
            <ViewContainer>
                <_LevelsView levels={levels}/>
            </ViewContainer>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}


function _LevelsView({levels}: { levels: Array<TraningLevelDefinition> }) {
    return (
        <TGui.Row xs={1} md={4} className="g-4">

            {
                levels.map((value) => {
                    return (
                        <TGui.Col key={value.uid}>
                            <TGui.Card>
                                <TGui.CardMedia
                                    sx={{height: 140}}
                                    image={FsTools.ConvertFilePath(FsTools.GetPlatformPath("/Images/Question.Text.png"))}
                                />
                                <TGui.CardContent>

                                </TGui.CardContent>

                                <TGui.CardActions>
                                    <TGui.Button
                                        label={"open"}
                                        onClick={() => {
                                            alert("Unimplemented")
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