import React from "react";
import {Col, Row} from "react-bootstrap";

import {MiddleSearchBar} from "@components/SearchBar";
import AssetCard from "@components/assets/AssetCard";
import AssetParent from "@platform/assets/AssetParent";
import AssetsApi from "@api/AssetsApi";
import {TurtleButton} from "@platform/components/TurtleButtons";
import {Stack} from "@mui/material";
import LicenceManager from "@platform/licences/LicenceManager";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import CreateAssetOffcanvas from "@editors/appmanagement/assets/CreateAssetOffcanvas";

export default function UniversalAssetList({assetType}) {


    const popupZus = useGlobalPopup()

    const [assets, setAssets] = React.useState(new Array<AssetParent>())

    const refreshAssets = () => {
        AssetsApi.GetAllAssetsOfType("", assetType).then((response) => {
            setAssets(response)
        })
    }

    const createAssetPressed = () => {
        popupZus.pushElement(
            <CreateAssetOffcanvas
                assetType={assetType}
                onRefresh={refreshAssets}
                onClose={popupZus.popElement}
            />
        )

    }


    React.useEffect(refreshAssets, [assetType])


    return (
        <div className={"vstack gap-3"}>

            <MiddleSearchBar/>


            {
                LicenceManager.HasEditLicence() && <Stack>
                    <TurtleButton
                        label={"core.asset.create"}
                        color={"success"}
                        variant={"outlined"}
                        onClick={createAssetPressed}
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}

                    />

                </Stack>

            }


            <Row xs={1} md={4} className="g-4">

                {
                    assets.map((value) => {
                        return (
                            <Col key={value.uid}>
                                <AssetCard asset={value}/>
                            </Col>
                        )
                    })
                }

            </Row>


        </div>

    )
}