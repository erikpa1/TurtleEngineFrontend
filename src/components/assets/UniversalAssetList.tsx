import React from "react";
import {Col, Row} from "react-bootstrap";

import AssetCard from "@components/assets/AssetCard";
import AssetParent from "@platform/assets/AssetParent";
import AssetsApi from "@api/AssetsApi";
import {TGui} from "@external/tgui";


import LicenceManager from "@platform/licences/LicenceManager";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateAssetOffcanvas from "@editors/appmanagement/assets/CreateAssetOffcanvas";

import AssetParentLight from "@platform/assets/AssetParentLight";
import {AssetDefinition, AssetsTypeMap} from "@platform/assets/Assets";


interface UniversalAssetListProps {
    assetDefinition: AssetDefinition,
    parentProjectUid: string,
    md?: number

}

export default function UniversalAssetList(props: UniversalAssetListProps) {

    const _md = props.md ?? 4

    const popupZus = useGlobalPopup()

    const [assets, setAssets] = React.useState(new Array<AssetParentLight>())

    const refreshAssets = () => {
        AssetsApi.GetAllAssetsOfType(props.parentProjectUid, props.assetDefinition.TYPE).then((response) => {
            setAssets(response)
        })
    }

    const createAssetPressed = () => {
        popupZus.pushElement(
            <CreateAssetOffcanvas
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
                LicenceManager.HasEditLicence() && <TGui.Stack>
                    <TGui.Button
                        label={"core.asset.create"}
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
                                <AssetCard onRefresh={refreshAssets} asset={value}/>
                            </Col>
                        )
                    })
                }

            </Row>


        </div>

    )
}