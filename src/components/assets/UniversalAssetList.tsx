import React from "react";
import {Col, Row} from "react-bootstrap";

import {MiddleSearchBar} from "@components/SearchBar";
import AssetCard from "@components/assets/AssetCard";
import AssetParent from "@platform/assets/AssetParent";
import AssetsApi from "@api/AssetsApi";

export default function UniversalAssetList({assetType}) {

    const [assets, setAssets] = React.useState(new Array<AssetParent>())

    React.useEffect(() => {

        AssetsApi.GetAllAssetsOfType("", assetType).then((response) => {
            setAssets(response)
        })
    }, [assetType])

    return (
        <div className={"vstack gap-3"}>

            <MiddleSearchBar/>

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