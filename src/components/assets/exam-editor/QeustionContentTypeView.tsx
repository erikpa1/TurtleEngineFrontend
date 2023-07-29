import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import React from "react";
import {ExamQuestion} from "@platform/assets/exam";
import assets, {AssetDefinition, AssetsTypeMap} from "@platform/assets/Assets";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {useParams} from "react-router-dom";
import Asset from "@platform/assets/Asset";
import {useLoadAsset, useOpenAssetDispatcher} from "@components/assets/assets_hooks";


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
        const image = FsTools.GetPlatformPath("Images/ProjectPreview.png")

        if (question.content_uid !== "") {

            return (
                <_ExistingAssetCardLoader
                    question={question}
                    onReplace={addAssetPressed}
                />
            )
        } else {

            return (
                <TGui.Card>
                    <TGui.CardMedia
                        sx={{height: 100}}
                        image={FsTools.ConvertFilePath(image)}
                    />

                    <TGui.CardActions>
                        <TGui.Button
                            label={"select"}
                            onClick={addAssetPressed}
                        />

                    </TGui.CardActions>


                </TGui.Card>
            )

        }
    }
}

interface _ExistingAssetCardLoaderProps {
    question: ExamQuestion
    onReplace: any
}

function _ExistingAssetCardLoader({question, onReplace}: _ExistingAssetCardLoaderProps) {


    const {projectuid}: any = useParams()

    const asset = useLoadAsset(projectuid, question.content_uid)


    if (asset) {
        return (
            <_ExistingAssetPickView
                asset={asset}
                question={question}
                onReplace={onReplace}
            />
        )
    } else {
        return (
            <TGui.MiddleSpinner/>
        )
    }

}

interface _ExistingAssetPickViewProps {
    asset: Asset
    question: ExamQuestion
    onReplace: any
}

function _ExistingAssetPickView({asset, question, onReplace}: _ExistingAssetPickViewProps) {


    const dispatchAsset = useOpenAssetDispatcher()

    const editAssetPressed = () => {
        dispatchAsset(asset)
    }

    return (
        <TGui.Card>
            <TGui.CardMedia
                sx={{height: 100}}
                image={FsTools.ConvertFilePath(asset.GetPreviewPath())}
            />
            <TGui.CardContent>
                <TGui.Typography>
                    {asset.name}
                </TGui.Typography>

            </TGui.CardContent>

            <TGui.CardActions>
                <TGui.Button
                    label={"replace"}
                    onClick={onReplace}
                />

                <TGui.Button
                    label={"edit"}
                    onClick={editAssetPressed}
                />
            </TGui.CardActions>

        </TGui.Card>
    )
}

