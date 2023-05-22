import AssetParent from "@platform/assets/AssetParent";

export default class AssetsApi {


    static async GetAllAssetsOfType(projectUid: string, assetType: string): Promise<Array<AssetParent>> {

        



        return [0, 1, 2, 3].map((value) => {
            const asset = new AssetParent()
            asset.name = `${assetType}-${value}`
            asset.uid = `tmp-${assetType}-${value}`
            asset.relativePath = `/dev/assets/${assetType}/tmp-${assetType}/Preview.png`
            asset.description = "This asset is for"
            return asset
        })
    }
}