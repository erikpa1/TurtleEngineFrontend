import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import React from "react";
import {ExamQuestion} from "@platform/assets/exam";
import {AssetDefinition, AssetsTypeMap} from "@platform/assets/Assets";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {useParams} from "react-router-dom";
import Asset from "@platform/assets/Asset";


interface QuestionContentTypeViewProps {

    question: ExamQuestion
    onRefresh: any

}

export default function QuestionContentTypeView({question, onRefresh}: QuestionContentTypeViewProps) {

    const {projectuid}: any = useParams()

    const popup = useGlobalPopup()

    function addAssetPressed() {

        const offCanvas = (
            <TGui.Offcanvas
                closeEnabled={true}
                onClose={popup.popElement}
                width={"1000px"}
                header={<TGui.OffcanvasTitle>{"select"}</TGui.OffcanvasTitle>}
            >
                <UniversalAssetList
                    md={4}
                    assetDefinition={AssetsTypeMap.get(question.content_type)}
                    parentProjectUid={projectuid}
                    mode={UniversalAssetListModes.SELECT}
                    onSelect={(asset) => {
                        question.content_uid = asset.uid
                        popup.popElement()
                        onRefresh()

                    }}

                />
            </TGui.Offcanvas>
        )

        popup.pushElement(offCanvas)

    }


    if (question.content_type === "") {
        return (
            <></>
        )
    } else {

        let image = FsTools.GetPlatformPath("Images/ProjectPreview.png")
        let cardActions = (<></>)
        let cardBody = (<></>)

        if (question.content_uid !== "") {

            cardBody = (<>
                <TGui.Typography>{question.content_uid}</TGui.Typography>
            </>)

            cardActions = (<>
                <TGui.Button
                    label={"replace"}
                    onClick={addAssetPressed}
                />
            </>)
        } else {
            cardActions = (
                <>
                    <TGui.Button
                        label={"select"}
                        onClick={addAssetPressed}
                    />
                </>
            )
        }

        return (
            <TGui.Card>
                <TGui.CardMedia
                    sx={{height: 100}}
                    image={FsTools.ConvertFilePath(image)}
                />

                <TGui.CardContent>
                    {cardBody}
                </TGui.CardContent>

                <TGui.CardActions>
                    {
                        cardActions
                    }
                </TGui.CardActions>


            </TGui.Card>
        )

    }
}

function _ExistingAssetCardLoader({assetUid}) {


    const [asset, setAsset] = React.useState<Asset | null>(null)

    if (asset) {
        return (
            <>
            </>
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }


}

