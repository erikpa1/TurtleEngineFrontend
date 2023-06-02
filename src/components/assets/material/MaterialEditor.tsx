import React from "react";

import MaterialAsset from "@platform/assets/MaterialAsset";

import {MiddleSpinner} from "@components/Spinners";
import {useParams} from "react-router-dom";
import AssetsApi from "@api/AssetsApi";
import {process} from "@tauri-apps/api";


export default function MaterialEditor({}) {


    const {projectuid, materialuid} = useParams()

    const _projectUid: string = projectuid ?? ""
    const _materialUid: string = materialuid ?? ""


    const [material, setMaterial] = React.useState<MaterialAsset | null>(null)


    React.useEffect(() => {

        AssetsApi.GetAsset(MaterialAsset, _projectUid, _materialUid).then((value) => {
            setMaterial(value)
        })

    }, [_projectUid, _materialUid])

    if (material) {
        return (
            <_MaterialEditor material={material}/>
        )
    } else {
        return (
            <MiddleSpinner/>
        )
    }

}

interface _MaterialEditorProps {
    material: MaterialAsset
}

function _MaterialEditor({material}) {
    return (
        <div>

        </div>
    )
}