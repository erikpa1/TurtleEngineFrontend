import React from "react";
import {ViewContainer} from "@components/ViewContainer";

import {TGui} from "@external/tgui";
import {useParams} from "react-router-dom";
import LanguagesEditTable from "@components/projects/LanguagesEditTable";
import LanguagesApi, {LangsMap} from "@api/LanguagesApi";

export default function LanguagesEditView({}) {

    const {projectuid}: any = useParams()

    const [avlLangs, setAvlLangs] = React.useState<null | Set<string>>(null)

    const [langsMap, setLangsMap] = React.useState<null | LangsMap>()

    React.useEffect(() => {

        LanguagesApi.GetProjectLanguages(projectuid).then((value) => {
            setAvlLangs(value)

            LanguagesApi.GetAll(projectuid, value).then((value) => {
                setLangsMap(value)
            })

        })


    }, [projectuid])

    if (avlLangs && langsMap) {
        return (
            <_LanguagesEditView avlLangs={avlLangs} langs={langsMap}/>
        )
    } else {
        return (<TGui.MiddleSpinner/>)
    }

}

interface _LanguagesEditViewProps {
    avlLangs: Set<string>
    langs: Map<string, Map<string, string | null>>
}

function _LanguagesEditView({avlLangs, langs}: _LanguagesEditViewProps) {


    const [_avlLangs, setAvlLangs] = React.useState(avlLangs)

    function refresh() {
        setAvlLangs(new Set(Array.from(avlLangs.values())))
    }

    return (
        <TGui.Stack gap={3}>
            <_AvlLangsLine avlLangs={_avlLangs} onRefresh={refresh}/>
            <LanguagesEditTable langs={langs} avlLangs={_avlLangs}/>
        </TGui.Stack>
    )
}

interface _AvlLangsLineProps {
    avlLangs: Set<string>
    onRefresh: () => void
}


function _AvlLangsLine({avlLangs, onRefresh}: _AvlLangsLineProps) {

    function deletePressed() {

    }

    return (
        <TGui.Card style={{
            padding: "0.5em"
        }}>
            <TGui.Stack gap={3} direction={"horizontal"}>
                {
                    Array.from(avlLangs.values()).map((value) => {
                        return (
                            <TGui.Chip key={value} label={value} onDelete={deletePressed}/>
                        )
                    })
                }

            </TGui.Stack>
        </TGui.Card>
    )
}
