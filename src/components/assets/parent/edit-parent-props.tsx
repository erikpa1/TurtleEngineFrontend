import React, {SyntheticEvent} from "react";
import AssetParent from "@platform/assets/AssetParent";
import {TurtleTextField} from "@platform/components/TurtleForms";

interface _AllProps {
    asset: AssetParent
}

export function EditAssetNameFormField({asset}: _AllProps) {

    const [name, setName] = React.useState(asset.name)

    const nameChanged = (e: SyntheticEvent) => {
        asset.name = e.target.value
        setName(name)

    }

    return (
        <TurtleTextField
            value={name}
            onChange={nameChanged}
            label={"name"}
        />
    )
}

export function EditAssetDescriptionFormField({asset}: _AllProps) {

    const [desciption, setDescription] = React.useState(asset.description)

    const descChanged = (e: SyntheticEvent) => {
        asset.description = e.target.value
        setDescription(name)
    }

    return (
        <TurtleTextField
            value={desciption}
            onChange={descChanged}
            label={"description"}
        />
    )
}

export function EditAssetPreviewForm({asset}: _AllProps) {
    alert("Edit asset form is unimplemented")
}