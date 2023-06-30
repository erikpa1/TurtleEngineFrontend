import React, {SyntheticEvent} from "react";
import AssetParent from "@platform/assets/AssetParent";
import {TurtleSelectField, TurtleTextField} from "@platform/components/TurtleForms";
import AssetParentLight from "@platform/assets/AssetParentLight.ts";
import {TGui} from "@external/tgui.ts";

interface _AllProps {
    asset: AssetParent | AssetParentLight
}

export function EditAssetNameFormField({asset}: _AllProps) {

    const [name, setName] = React.useState(asset.name)

    const nameChanged = (e: SyntheticEvent | any) => {
        const _name = e.target.value
        asset.name = _name
        setName(_name)

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
        const newDesc = e.target.value
        asset.description = newDesc
        setDescription(newDesc)
    }

    return (
        <TurtleTextField
            value={desciption}
            onChange={descChanged}
            label={"description"}
        />
    )
}

interface EditAssetTypeFormFieldProps {
    asset: AssetParentLight
    options: Array<[string, string]>
    onSelected: any
}

export function EditAssetSubTypeFormField(props: EditAssetTypeFormFieldProps) {

    const [value, setValue] = React.useState(props.asset.subtype)

    return (
        <TGui.TSelect
            onChange={(e) => {
                const val = e.target.value
                setValue(val)

                props.onSelected(val)
            }}
            label={"type"}
            value={value}
            items={props.options}

        />
    )

}


export function EditAssetPreviewForm({asset}: _AllProps) {
    alert("Edit asset form is unimplemented")
}