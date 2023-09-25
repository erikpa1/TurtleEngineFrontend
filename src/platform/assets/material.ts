import {AssetData, ProjectSerializationContext} from "@platform/assets/Asset";

export class MaterialTypes {
    static UNDEFINED = "undefined"
    static PHYSICAL = "physical"
    static BASIC = "basic"
    static NORMAL = "normal"
    static PHONG = "phong"
    static STANDARD = "standard"

    static ToArray(): Array<string> {
        return [
            MaterialTypes.PHYSICAL,
            MaterialTypes.BASIC,
            MaterialTypes.NORMAL,
            MaterialTypes.PHONG,
            MaterialTypes.STANDARD,
        ]
    }
}


export default class MaterialData extends AssetData {

    type = MaterialTypes.UNDEFINED

    type_data: TurtleMaterialTypeData = new TurtleMaterialTypeData()

    ToJson(): any {
        return {
            ...super.ToJson(),
            type_data: this.type_data.ToJson(),
            type: this.type
        }
    }

    FromJson(context: ProjectSerializationContext, data: any) {
        super.FromJson(context, data);

        this.type = data.type ?? this.type
        const typeClazz = MAPPING[this.type]

        if (typeClazz) {
            this.type_data = new typeClazz()
            this.type_data.FromJson(data.type_data ?? {})
        }


    }

}


export class TurtleMaterialTypeData {

    ToJson(): any {
        return {}
    }

    FromJson(jObj: any) {
        //Do nothing, yet,..
    }
}

export class TurtlePhysicsMaterial extends TurtleMaterialTypeData {

    flat_shading = false
    wireframe = false

    base = ""
    metalness = ""
    roughness = ""
    normal = ""
    ao = ""

    ToJson(): any {
        return {
            ...super.ToJson(),
            flat_shading: this.flat_shading,
            wireframe: this.wireframe,
            base: this.base,
            metalness: this.metalness,
            roughness: this.roughness,
            normal: this.normal,
            ao: this.ao
        }
    }

    FromJson(jObj: any | TurtlePhysicsMaterial) {
        this.flat_shading = jObj.flat_shading ?? this.flat_shading
        this.wireframe = jObj.wireframe ?? this.wireframe
        this.base = jObj.base ?? this.metalness
        this.metalness = jObj.metalness ?? this.metalness
        this.roughness = jObj.roughness ?? this.roughness
        this.normal = jObj.normal ?? this.normal
        this.ao = jObj.normal ?? this.normal

    }


}

const MAPPING = {}

MAPPING[MaterialTypes.PHYSICAL] = TurtlePhysicsMaterial
MAPPING[MaterialTypes.BASIC] = TurtleMaterialTypeData
MAPPING[MaterialTypes.NORMAL] = TurtleMaterialTypeData
MAPPING[MaterialTypes.PHONG] = TurtleMaterialTypeData
MAPPING[MaterialTypes.STANDARD] = TurtleMaterialTypeData


