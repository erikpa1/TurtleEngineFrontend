import TurtleOffcanvas from "@components/Drawers";

import React, {SyntheticEvent} from "react";

import {useTranslation} from "react-i18next";
import {Box, Stack, TextField} from "@mui/material";
import {CreateAssetParamas, CreateProjectParams} from "@api/project/params";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {Offcanvas} from "react-bootstrap";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";
import AssetsApi from "@api/AssetsApi";


import {useActiveProjectZus} from "@platform/zustands/projectZuses";

import {TGui} from "@external/tgui";

import Assets, {AssetDefinition} from "@platform/assets/Assets";
import CreateAssetWithFileContent, {ImagePicker} from "@editors/appmanagement/assets/CreateAssetWithFileContent";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";

import PanoramaAssetManager from "@platform/assets-managers/PanoramaAssetManager";
import AssetParentManager from "@platform/assets-managers/AssetParentManager";

import QuizAssetManager from "@platform/assets-managers/QuizAssetManager";
import FsTools from "@api/FsTools";
import AreaAssetManager from "@platform/assets-managers/AreaAssetManager";
import CreateSceneOffcanvas from "@editors/appmanagement/assets/create/create-or-edit-scene";
import ImagesApi from "@api/ImagesApi";
import {preview} from "vite";
import {AssetData} from "@platform/assets/Asset";

interface CreateAssetOffcanvasProps {
    onClose?: () => void
    onRefresh?: () => void

    assetDefinition: AssetDefinition,

}

export default function CreateAssetOffcanvasDispatcher(props: CreateAssetOffcanvasProps) {

    const [t] = TGui.T()

    let body: any = null

    if (props.assetDefinition.TYPE === Assets.Scene.TYPE) {
        body = <CreateSceneOffcanvas {...props as any}/>
    } else {
        body = <_CreateOtherAssets {...props}/>
    }

    return (

        <TurtleOffcanvas
            onClose={props.onClose}
            closeEnabled={true}
            header={<Offcanvas.Title>
                {t("create")}: <b style={{textTransform: "uppercase"}}>{t(props.assetDefinition.TYPE)}</b>
            </Offcanvas.Title>}
        >
            <TGui.Box>
                <Stack spacing={2}>
                    {body}
                </Stack>
            </TGui.Box>

        </TurtleOffcanvas>

    )


}

function _CreateOtherAssets(props: CreateAssetOffcanvasProps) {

    const [t] = useTranslation()

    const assetDefinition = props.assetDefinition
    const assetType = assetDefinition.TYPE

    const lock = useGlobalAppLock()

    const projectZus = useActiveProjectZus()

    const projectUid = projectZus.project.uid

    const [thumbnail, setThumbnail] = React.useState(FsTools.GetPlatformPath(props.assetDefinition.DEFAULT_PREVIEW))

    const [basicParams] = React.useState<CreateAssetParamas | any>(new CreateAssetParamas())

    const [uploadFileParams] = React.useState<UploadAssetFileParams>(new UploadAssetFileParams())
    const createAssetPressed = async () => {

        lock.lock()
        props.onClose && props.onClose()

        if (assetType === Assets.Panorama.TYPE) {
            await PanoramaAssetManager.CreatePanoramaAsset(basicParams, uploadFileParams)
        } else {
            const asset = await AssetsApi.CreateAsset(basicParams)


            const targetPath = FsTools.GetPathInProject(projectUid, `Assets/${asset.uid}/Preview.png`)

            const newDefaultData = props.assetDefinition.DEFAULT_DATA()

            newDefaultData.uid = asset.uid

            await AssetsApi.UploadAssetData(projectUid, asset.uid, newDefaultData.ToJson())

            if (props.assetDefinition.DEFAULT_FILES.length > 0) {

                props.assetDefinition.DEFAULT_FILES.map((value) => {
                    const from = FsTools.GetPlatformPath(value[0])
                    const inAssetPath = `Assets/${asset.uid}/${value[1]}`
                    const pathTo = FsTools.GetPathInProject(projectUid, inAssetPath)

                    AssetsApi.CopyAssetFileDesktop(from, pathTo)
                })

            }

            asset.hasPreview = true

            await AssetsApi.UploadAssetLight(asset)

            await ImagesApi.GeneratePreviewDesktop(thumbnail, targetPath, 256)

        }

        lock.unlock()
        props.onRefresh && props.onRefresh()
    }

    const pNameChanged = (e: SyntheticEvent) => {
        basicParams.name = e.target.value

    }

    const descChanged = (e: SyntheticEvent) => {
        basicParams.description = e.target.value
    }


    React.useEffect(() => {

        basicParams.assetDefinition = props.assetDefinition
        basicParams.assetType = props.assetDefinition.TYPE
        basicParams.project_uid = projectZus.project.uid

        uploadFileParams.project_uid = projectUid
        uploadFileParams.asset_type = assetType
        uploadFileParams.path_from = FsTools.GetPlatformPath(assetDefinition.DEFAULT_PREVIEW)

    }, [])

    return (
        <>

            <TurtleTextField
                onChange={pNameChanged}
                label={"name"}
            />

            <TurtleTextField
                onChange={descChanged}
                label={"description"}
                multiline
            />

            <TurtleTextField
                label={"author"}
                disabled
            />

            <ImagePicker
                image={thumbnail}
                imagePickedDesktop={(previewPath: string) => {
                    setThumbnail(previewPath)
                }}

                imagePickedWeb={() => {
                    alert("Unimplemented")
                }}
            />

            {
                props.assetDefinition.TYPE === Assets.Panorama.TYPE &&
                <CreateAssetWithFileContent
                    assetDefinition={assetDefinition}
                    uploadFileParams={uploadFileParams}/>
            }


            <TGui.Stack>
                <TurtleButton
                    variant={"outlined"}
                    onClick={createAssetPressed}
                    label={"create.asset"}
                />
            </TGui.Stack>


        </>


    )
}
