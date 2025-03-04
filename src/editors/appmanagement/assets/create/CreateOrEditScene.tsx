import React from "react";

import Asset from "@platform/assets/Asset";

import {TGui} from "@external/tgui";

import Assets from "@platform/assets/Assets";

import {
    EditAssetDescriptionFormField,
    EditAssetNameFormField,
    EditAssetSubTypeFormField
} from "@components/assets/parent/edit-parent-props";

import {TurtleButton} from "@platform/components/TurtleButtons";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";

import {ImagePicker} from "@editors/appmanagement/assets/CreateAssetWithFileContent";

import SceneAssetManager from "@platform/assets-managers/SceneAssetManager";

import {Ext} from "@external/prelude";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import FsTools from "@api/FsTools";
import ImagesApi from "@api/ImagesApi";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import UniversalAssetList, {UniversalAssetListModes} from "@components/assets/UniversalAssetList";
import TurtleScene from "@data/project/Scene"
import ScenesApi from "@api/ScenesApi"
import {useParams} from "react-router-dom"


interface CreateOrEditSceneOffContentProps {
    onRefresh?: any
    onClose?: any

}

export default function CreateSceneOffcanvas(props: CreateOrEditSceneOffContentProps) {

    const {projectuid} = useParams()

    const popupZus = useGlobalPopup()
    const activeProjectZus = useActiveProjectZus()

    const [thumbnail, setThumbnail] = React.useState(FsTools.GetPlatformPath(Assets.Scene.DEFAULT_PREVIEW))

    const [asset, setAsset] = React.useState<TurtleScene | null>(null)

    const [subAsset, setSubAsset] = React.useState<Asset | null>(null)

    const [sceneType, setSceneType] = Ext.Cookie.useCookie("new-entities-type", "virtual")

    const [uploadFileParams] = React.useState<UploadAssetFileParams>(new UploadAssetFileParams())

    const lock = useGlobalAppLock()

    const createAssetPressed = async () => {

        if (asset) {

            lock.lock()

            props.onClose && props.onClose()

            console.log(projectuid)

            asset.parent = projectuid as any
            await ScenesApi.CreateScene(asset)

            // await ImagesApi.GeneratePreviewDesktop(thumbnail,
            //     FsTools.GetPathInProject(activeProjectZus.project.uid, `Assets/${asset.uid}/Preview.png`),
            //     256
            // )

            lock.unlock()
            props.onRefresh && props.onRefresh()

        }
    }

    function selectPanoramaPressed() {


        const offCanvas = (
            <TGui.Offcanvas
                closeEnabled={true}
                onClose={popupZus.popElement}
                width={"1000px"}
                header={<TGui.OffcanvasTitle>{"select"}</TGui.OffcanvasTitle>}
            >
                <UniversalAssetList
                    md={4}
                    assetDefinition={Assets.Panorama}
                    parentProjectUid={activeProjectZus.project.uid}
                    mode={UniversalAssetListModes.SELECT}
                    onSelect={(asset) => {
                        setSubAsset(asset)
                        popupZus.popElement()
                    }}

                />
            </TGui.Offcanvas>
        )

        popupZus.pushElement(offCanvas)

    }

    React.useEffect(() => {
        const _asset = new TurtleScene()


        setAsset(_asset)
    }, [])

    if (asset) {

        return (
            <>
                <EditAssetNameFormField asset={asset}/>

                <EditAssetDescriptionFormField asset={asset}/>

                <EditAssetSubTypeFormField
                    asset={asset as any}
                    options={Assets.Scene.SUBTYPES}
                    onSelected={(selection) => {
                        setSceneType(selection)
                    }}
                />


                <TGui.Switch condition={sceneType}>

                    <TGui.Case value={"panorama"}>
                        <TGui.Card>
                            <TGui.CardMedia
                                sx={{height: 140}}
                                image={FsTools.ConvertFilePath(subAsset ? subAsset.GetPreviewPath() : "")}
                            />
                            <TGui.CardActions>
                                <TGui.Button
                                    onClick={selectPanoramaPressed}
                                    label={"select"}
                                />
                            </TGui.CardActions>
                        </TGui.Card>
                    </TGui.Case>

                    <TGui.Default>
                        <ImagePicker
                            image={thumbnail}
                            imagePickedDesktop={(newPath) => {
                                setThumbnail(newPath)
                            }}
                            imagePickedWeb={() => {
                                alert("Unimplemented")
                            }}
                        />
                    </TGui.Default>

                </TGui.Switch>


                <TGui.Stack>
                    <TurtleButton
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