import {Assets} from "@platform/assets/Assets";


export class AssetConstants {

    static FOLDER_TYPES_MAP: Map<string, string> = new Map(Assets.worldAssets().map((asset) => {
        return [asset.TYPE, asset.FOLDER]
    }))

    static GetFolderOnType(assetType: string): string {
        const tmp = AssetConstants.FOLDER_TYPES_MAP.get(assetType)
        if (tmp) {
            return tmp
        } else {
            return "Undefined"
        }
    }


}
