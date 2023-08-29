import React from "react";
import {ViewContainer} from "@components/ViewContainer";

import TraningLevelDefinition from "@data/vts/TraningLevelDefinition";

import {TGui} from "@external/tgui";

import TrainingsApi from "@api/TraningsApi"
import {useNavigate} from "react-router-dom";
import FsTools from "@api/FsTools";

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

    const navigate = useNavigate()


    function clicked() {
        navigate("/trainings-player-guis")
    }

    return (
        <TGui.Row xs={1} md={4} className="g-4">

            {
                levels.map((value) => {
                    return (
                        <TGui.Col key={value.uid}>
                            <TGui.Card>
                                <TGui.CardMedia
                                    sx={{height: 140}}
                                    image={FsTools.ConvertFilePath(value.image)}
                                    onClick={clicked}
                                    style={{cursor: "pointer"}}
                                />
                                <TGui.CardContent>
                                    <TGui.Typography>
                                        {value.lang}
                                    </TGui.Typography>
                                    <TGui.TextMicro>
                                        {value.desciption}
                                    </TGui.TextMicro>

                                </TGui.CardContent>

                                <TGui.CardActions>
                                    <TGui.Button
                                        label={"open"}
                                        onClick={clicked}
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