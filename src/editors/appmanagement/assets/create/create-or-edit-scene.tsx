import React from "react";

import Asset from "@platform/assets/Asset.ts";

import {TGui} from "@external/tgui.ts";

import Assets from "@platform/assets/Assets.ts";

import {
    EditAssetDescriptionFormField,
    EditAssetNameFormField,
    EditAssetSubTypeFormField
} from "@components/assets/parent/edit-parent-props";

import {TurtleButton} from "@platform/components/TurtleButtons";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";

import CreateAssetWithFileContent from "@editors/appmanagement/assets/CreateAssetWithFileContent";

import SceneAssetManager from "@platform/assets-managers/SceneAssetManager.ts";

import {Ext} from "@external/prelude.ts";
import {useActiveProjectZus} from "@platform/zustands/projectZuses.ts";
import {VirtualSceneData} from "@platform/assets/scene.ts";


interface CreateOrEditSceneOffContentProps {
    onRefresh?: any
    onClose?: any

}

export default function CreateSceneOffcanvas(props: CreateOrEditSceneOffContentProps) {

    const activeProjectZus = useActiveProjectZus()

    const [asset, setAsset] = React.useState<Asset | null>(null)


    const [sceneType, setSceneType] = Ext.Cookie.useCookie("new-scene-type", "virtual")

    const [uploadFileParams] = React.useState<UploadAssetFileParams>(new UploadAssetFileParams())

    const lock = useGlobalAppLock()

    const createAssetPressed = async () => {

        if (asset) {

            lock.lock()

            if (props.onClose) {
                props.onClose()
            }


            await SceneAssetManager.CreateSceneAsset(asset)

            lock.unlock()

            if (props.onRefresh) {
                props.onRefresh()
            }

        }


    }

    React.useEffect(() => {
        const _asset = new Asset()
        _asset.type = Assets.Scene.TYPE
        _asset.subtype = sceneType
        _asset.assetDefinition = Assets.Scene
        _asset.parent_project_uid = activeProjectZus.project.uid

        setAsset(_asset)
    }, [])

    if (asset) {

        return (
            <>
                <EditAssetNameFormField asset={asset}/>

                <EditAssetDescriptionFormField asset={asset}/>

                <EditAssetSubTypeFormField
                    asset={asset}
                    options={Assets.Scene.SUBTYPES}
                    onSelected={(selection) => {
                        setSceneType(selection)
                    }}
                />


                {/*<CreateAssetWithFileContent*/}
                {/*    assetDefinition={Assets.Scene}*/}
                {/*    uploadFileParams={uploadFileParams}*/}
                {/*/>*/}


                <TGui.Switch condition={sceneType}>

                    <TGui.Case value={"panorama"}>
                        <TGui.Card>
                            <TGui.CardMedia
                                sx={{height: 140}}
                            />
                            <TGui.CardActions>
                                <TGui.Button
                                    label={"select"}
                                />
                            </TGui.CardActions>
                        </TGui.Card>
                    </TGui.Case>

                </TGui.Switch>


                <TGui.Stack>
                    <TurtleButton
                        variant={"outlined"}
                        onClick={createAssetPressed}
                        label={"create.asset"}
                    />
                </TGui.Stack>
            </>
        )
    } else {
        return (
            <></>
        )
    }

}

interface EditSceneOffcanvasProps {
    asset: Asset
}

export function EditSceneOffcanvas(props: EditSceneOffcanvasProps) {

    function editPressed() {
        //pass
    }

    return (
        <>
            <EditAssetNameFormField asset={props.asset}/>

            <EditAssetDescriptionFormField asset={props.asset}/>

            <TGui.Stack>
                <TurtleButton
                    variant={"outlined"}
                    onClick={editPressed}
                    label={"edit"}
                />
            </TGui.Stack>
        </>
    )
}