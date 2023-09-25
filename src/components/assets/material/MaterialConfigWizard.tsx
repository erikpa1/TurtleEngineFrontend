import MaterialData, {MaterialTypes} from "@platform/assets/material";
import {TGui} from "@external/tgui";
import FsTools from "@api/FsTools";
import React from "react";


interface _MaterialConfigWizardProps {
    material: MaterialData
    onChanged: () => void
}

export default function MaterialConfigWizard(props: _MaterialConfigWizardProps) {


    function _materialSelected(material: string) {
        props.material.type = material
        props.onChanged()

    }

    return (
        <TGui.Row>
            {
                MaterialTypes.ToArray().map((value) => {
                    return (
                        <TGui.Col>
                            <_MaterialCard
                                onMaterialSelected={_materialSelected}
                                type={value}
                            />

                        </TGui.Col>
                    )
                })
            }
        </TGui.Row>
    )
}

interface _MaterialCardProps {
    type: string
    onMaterialSelected: (type: string) => void
}

function _MaterialCard(props: _MaterialCardProps) {

    const [t] = TGui.T()

    return (


        <TGui.Card sx={{maxWidth: 345}}>
            <TGui.CardMedia
                sx={{height: 120}}
                image={FsTools.GetPlatformPath(`materials/WizardTemplate_${props.type}.png`)}
                title={t(`material.${props.type}`)}
                style={{
                    cursor: "pointer"
                }}
                onClick={() => {
                    props.onMaterialSelected(props.type)
                }}
            />
            <TGui.CardContent>
                <TGui.Typography
                    variant="body2"
                    color="text.secondary"
                >
                    <b>{props.type}</b>
                </TGui.Typography>

            </TGui.CardContent>
        </TGui.Card>


    )

}