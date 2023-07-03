import React from "react";
import {Col, Row} from "react-bootstrap";

import AssetCard from "@components/assets/AssetCard";

import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";


import LicenceManager from "@platform/licences/LicenceManager";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateAssetOffcanvasDispatcher from "@editors/appmanagement/assets/CreateAssetOffcanvasDispatcher";

import Asset from "@platform/assets/Asset";
import {AssetDefinition} from "@platform/assets/Assets";


interface UniversalAssetListProps {
    assetDefinition: AssetDefinition,
    mode?: string
    onSelect?: (asset: Asset) => void
    parentProjectUid: string,
    md?: number
}

export const UniversalAssetListModes = {
    EDIT: "edit",
    SELECT: "select"
}

export default function UniversalAssetList(props: UniversalAssetListProps) {

    const _md = props.md ?? 4
    const _mode = props.mode ?? UniversalAssetListModes.EDIT

    const popupZus = useGlobalPopup()

    const [assets, setAssets] = React.useState(new Array<Asset>())

    const refreshAssets = () => {
        AssetsApi.GetAllAssetsOfType(props.parentProjectUid, props.assetDefinition.TYPE).then((response) => {
            setAssets(response)
        })
    }

    const createAssetPressed = () => {
        popupZus.pushElement(
            <CreateAssetOffcanvasDispatcher
                assetDefinition={props.assetDefinition}
                onRefresh={refreshAssets}
                onClose={popupZus.popElement}
            />
        )

    }


    React.useEffect(refreshAssets, [props.assetDefinition.TYPE])


    return (
        <div className={"vstack gap-3"}>

            <TGui.MiddleSearchBar/>

            {
                (LicenceManager.HasEditLicence() &&
                    _mode === UniversalAssetListModes.EDIT)
                &&
                <TGui.Stack>
                    <TGui.Button
                        label={"asset.create"}
                        color={"success"}
                        variant={"outlined"}
                        onClick={createAssetPressed}
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}

                    />

                </TGui.Stack>

            }


            <Row xs={1} md={_md} className={`g-${_md}`}>

                {
                    assets.map((value) => {
                        return (
                            <Col key={value.uid}>
                                <AssetCard
                                    onRefresh={refreshAssets}
                                    asset={value}
                                    mode={_mode}
                                    onSelect={props.onSelect}
                                />
                            </Col>
                        )
                    })
                }

            </Row>


        </div>

    )
}