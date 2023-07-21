import React from "react";
import Asset, {AssetData} from "@platform/assets/Asset";
import {useNavigate, useParams} from "react-router-dom";
import RoutesManager from "@platform/RoutesManager";
import AssetsApi from "@api/AssetsApi";
import {AssetDefinition, AssetsTypeMap} from "@platform/assets/Assets";

export function useOpenAssetDispatcher(): (asset: Asset) => void {

    const navigate = useNavigate()
    const openAsset = (asset: Asset) => {
        const projectUid = asset.parent_project_uid
        const assetUid = asset.uid
        const assetType = asset.type

        navigate(RoutesManager.GetAssetRoute(projectUid, assetType, assetUid))

    }

    return openAsset

}

export function useLoadAssetFromParams(): Asset | null {

    const {projectuid, assetuid}: any = useParams()

    const asset = useLoadAsset(projectuid, assetuid)

    return asset
}

export function useLoadAsset(projectUid: string, assetUid: string): Asset | null {

    const [asset, setAsset] = React.useState<Asset | null>(null)

    React.useEffect(() => {

        AssetsApi.GetAsset(projectUid, assetUid).then((asset: Asset) => {

            const clazz = AssetsTypeMap.get(asset.type)?.SUBTYPES_CONSTRUCTORS[asset.subtype]

            if (clazz) {
                AssetsApi.GetAssetData(clazz, projectUid, asset.uid).then((assetData) => {
                    asset.data = assetData
                    setAsset(asset)
                })
            } else {
                setAsset(asset)
            }

        })

    }, [projectUid, assetUid])


    return asset
}

