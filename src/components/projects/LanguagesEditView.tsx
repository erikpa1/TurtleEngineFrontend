import React from "react";
import {ViewContainer} from "@components/ViewContainer";

import {TGui} from "@external/tgui";
import {useParams} from "react-router-dom";
import LanguagesEditTable from "@components/projects/LanguagesEditTable";

export default function LanguagesEditView({}) {

    const {projectuid}: any = useParams()

    const [avlLangs, setAvlLangs] = React.useState<null | Set<string>>(null)

    const [langsMap, setLangsMap] = React.useState<null | Map<string, Map<string, string | null>>>()

    React.useEffect(() => {

    }, [projectuid])

    if (avlLangs && langsMap) {
        return (
            <ViewContainer>
                <_LanguagesEditView avlLangs={avlLangs} langs={langsMap}/>

            </ViewContainer>
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
            <LanguagesEditTable langs={langs}/>
        </TGui.Stack>
    )
}

interface _AvlLangsLineProps {
    avlLangs: Set<string>
    onRefresh: () => void
}


function _AvlLangsLine({avlLangs, onRefresh}: _AvlLangsLineProps) {
    return (
        <TGui.Card>
            <TGui.Stack gap={3} direction={"horizontal"}>
                {
                    Array.from(avlLangs.values()).map((value) => {
                        return (
                            <div key={value}>{value}</div>
                        )
                    })
                }

            </TGui.Stack>
        </TGui.Card>
    )
}
