import React from "react";


import {TGui} from "@external/tgui";


import Modals from "@components/Modals";
import {useTranslation} from "react-i18next";
import AssetsApi from "@api/AssetsApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import AssetParentLight from "@platform/assets/AssetParentLight";
import useOpenAssetDispatcher from "@components/assets/prelude";


interface AssetCardProps {
    asset: AssetParentLight
    onRefresh: any
}


export default function AssetCard({asset, onRefresh}: AssetCardProps) {

    const [t] = useTranslation()

    const lockZus = useGlobalAppLock()

    const [dispatchAsset] = useOpenAssetDispatcher()

    const editAssetPressed = () => {
        dispatchAsset(asset)
    }


    const deleteConfirmed = () => {

        lockZus.lock()

        AssetsApi.DeleteAssetWithUid(asset.parent_project_uid, asset.uid).then(() => {

            if (onRefresh) {
                onRefresh()
            }

            lockZus.unlock()
        })
    }
    const deletePressed = () => {
        Modals.showYesNoModal({
            lang: `${t("core.sure.remove.asset")}: ${asset.name} (${asset.uid})`,
            onYes: deleteConfirmed
        })
    }


    return (
        <TGui.Card sx={{maxWidth: 345}}>
            <TGui.CardMedia
                sx={{height: 140}}
                image={asset.GetPreviewPath()}
                title={asset.name}
            />
            <TGui.CardContent>
                <TGui.Typography gutterBottom variant="h5" component="div">
                    {asset.name}
                </TGui.Typography>
                <TGui.Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        minHeight: "50px",
                        maxHeight: "50px"
                    }}
                >
                    {asset.description}
                </TGui.Typography>
            </TGui.CardContent>
            <TGui.CardActions>
                <TGui.Button onClick={editAssetPressed} label={"core.edit"}/>
                <TGui.Button onClick={deletePressed} label={"core.delete"} color={"error"}/>
            </TGui.CardActions>
        </TGui.Card>
    );

}