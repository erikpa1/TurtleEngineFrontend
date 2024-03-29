import React from "react";


import {TGui} from "@external/tgui";


import Modals from "@components/Modals";
import {useTranslation} from "react-i18next";
import AssetsApi from "@api/AssetsApi";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import Asset from "@platform/assets/Asset";
import {useOpenAssetDispatcher} from "@components/assets/assets_hooks";
import FsTools from "@api/FsTools";


interface AssetCardProps {
    asset: Asset
    onRefresh: any
    onSelect?: (asset: Asset) => void
    mode?: string
}


export const AssetCardModes = {
    EDIT: "edit",
    SELECT: "select"
}

export default function AssetCard({
                                      asset,
                                      mode,
                                      onRefresh,
                                      onSelect
                                  }: AssetCardProps) {

    const _mode = mode ?? AssetCardModes.EDIT

    const [t] = useTranslation()

    const lockZus = useGlobalAppLock()

    const dispatchAsset = useOpenAssetDispatcher()

    const editAssetPressed = () => {
        dispatchAsset(asset)
    }

    const deleteConfirmed = () => {

        lockZus.lock()

        AssetsApi.DeleteAssetWithUid(asset).then(() => {

            if (onRefresh) {
                onRefresh()
            }

            lockZus.unlock()
        })
    }
    const deletePressed = () => {
        Modals.showYesNoModal({
            lang: `${t("sure.remove.asset")}: ${asset.name} (${asset.uid})`,
            onYes: deleteConfirmed
        })
    }


    return (
        <TGui.Card sx={{maxWidth: 345}}>
            <TGui.CardMedia
                sx={{height: 120}}
                image={FsTools.ConvertFilePath(asset.GetPreviewPath())}
                title={asset.name}
                style={{
                    cursor: "pointer"
                }}
                onClick={editAssetPressed}
            />
            <TGui.CardContent>

                {
                    asset.subtype !== "" &&
                    <TGui.Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {t("type")}: <b>{asset.subtype}</b>
                    </TGui.Typography>

                }

                <TGui.Typography gutterBottom component="div">
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

                {
                    mode === AssetCardModes.EDIT && <>
                        <TGui.Button onClick={deletePressed} label={"delete"} color={"error"}/>
                    </>
                }

                {
                    mode === AssetCardModes.SELECT && <>
                        <TGui.Button onClick={() => {
                            if (onSelect) {
                                onSelect(asset)
                            }
                        }} label={"select"}/>
                    </>
                }

            </TGui.CardActions>
        </TGui.Card>
    );

}