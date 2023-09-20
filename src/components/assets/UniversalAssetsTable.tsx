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
    parentProjectUid: string,

}

export const UniversalAssetListModes = {
    EDIT: "edit",
    SELECT: "select"
}

export default function UniversalAssetsTable(props: UniversalAssetListProps) {

    const popupZus = useGlobalPopup()

    const [assets, setAssets] = React.useState(new Array<Asset>())

    const refreshAssets = () => {
        AssetsApi.GetAllAssets(props.parentProjectUid).then((response) => {
            setAssets(response)
        })
    }

    React.useEffect(refreshAssets, [])


    return (
        <div className={"vstack gap-3"}>

            <TGui.MiddleSearchBar/>

            <TGui.Card
                style={{
                    backgroundColor: TGui.Colors.WhiteMiddle,
                }}>

                <TGui.Table>
                    {
                        assets.map((value, index) => {
                            return (
                                <TGui.TableRow>
                                    <TGui.TableCell>
                                        {index + 1}.
                                    </TGui.TableCell>
                                    <TGui.TableCell>
                                        {value.type}
                                    </TGui.TableCell>
                                    <TGui.TableCell>
                                        {value.name}
                                    </TGui.TableCell>
                                    <TGui.TableCell>
                                        {value.uid}
                                    </TGui.TableCell>

                                    <TGui.TableCell>
                                        <TGui.Stack direction={"horizontal"} gap={3}>
                                            <div>Delete</div>
                                            <div>Edit</div>
                                        </TGui.Stack>
                                    </TGui.TableCell>

                                </TGui.TableRow>
                            )
                        })
                    }
                </TGui.Table>


            </TGui.Card>


        </div>

    )
}