import {AssetData} from "@platform/assets/Asset.ts";

export class MeshAssetData extends AssetData {


    meshExtension: string = ""

    constructor() {
        super();
    }


    GetEntryFile(): string {
        return `$Assets/${this.uid}/Default.${this.meshExtension}`
    }

}