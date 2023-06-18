import TurtleOffcanvas from "@components/Drawers";
import Button from "@mui/material/Button";
import React, {SyntheticEvent} from "react";

import ProjectApi from "@api/project/ProjectApi";
import {useTranslation} from "react-i18next";
import {Box, Stack, TextField} from "@mui/material";
import {CreateAssetParamas, CreateProjectParams} from "@api/project/params";
import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {TurtleTextField} from "@platform/components/TurtleForms";
import AssetsApi from "@api/AssetsApi";
import {Offcanvas} from "react-bootstrap";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";
import {TGui} from "@external/tgui";
import ProjectsManagementView from "@editors/appmanagement/projects/ProjectsManagementView";
import {Assets} from "@platform/assets/Assets";
import CreatePanoramaOffcContent from "@editors/appmanagement/assets/CreatePanoramaOffcContent";
import {UploadAssetFileParams} from "@editors/appmanagement/assets/CreateParams";
import FsApi from "@api/FsApi";
import {CreateThumbnailParams} from "@api/AssetApiParams";

interface CreateAssetOffcanvasProps {
    onClose?: () => void
    onRefresh?: () => void

    assetType: string,

}

export default function CreateAssetOffcanvas(props: CreateAssetOffcanvasProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const projectZus = useActiveProjectZus()

    const projectUid = projectZus.project.uid

    const [basicParams] = React.useState<CreateAssetParamas | any>({
        name: "",
        description: "",
        assetType: props.assetType,
        project_uid: projectUid
    })


    const [uploadFileParams] = React.useState(new UploadAssetFileParams())
    const createAssetPressed = async () => {

        lock.lock()

        if (props.onClose) {
            props.onClose()
        }

        //Vytvorenie assetu
        const assetNewUid = await AssetsApi.CreateAsset(basicParams)

        uploadFileParams.asset_uid = assetNewUid

        //Update assetoveho obrazka
        const destinationFile = await AssetsApi.UpdateAssetFile(uploadFileParams)

        const thumbnailParams = new CreateThumbnailParams()
        thumbnailParams.source_file = destinationFile
        thumbnailParams.destination_file = FsApi.ReplaceFileExtention(destinationFile, "png")
        thumbnailParams.maxWidth = 256

        //Vytvorenie thumbnailu
        await AssetsApi.CreateAssetThumbnail(thumbnailParams)

        lock.unlock()

        if (props.onRefresh) {
            props.onRefresh()
        }


    }

    const pNameChanged = (e: SyntheticEvent) => {
        basicParams.name = e.target.value

    }

    const descChanged = (e: SyntheticEvent) => {
        basicParams.description = e.target.value
    }


    React.useEffect(() => {
        uploadFileParams.project_uid = projectUid
        uploadFileParams.asset_type = props.assetType

    }, [])

    return (
        <TurtleOffcanvas
            onClose={props.onClose}
            closeEnabled={true}

            header={<Offcanvas.Title>{t("core.create.asset")}</Offcanvas.Title>}
        >

            <Box>
                <Stack spacing={2}>

                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"core.name"}
                    />

                    <TurtleTextField
                        onChange={descChanged}
                        label={"core.description"}
                        multiline
                    />

                    <TurtleTextField
                        label={"core.author"}
                        disabled
                    />

                    <TGui.Switch condition={props.assetType}>
                        <TGui.Case value={Assets.Panorama.TYPE}>
                            <CreatePanoramaOffcContent createPanoramaData={uploadFileParams}/>
                        </TGui.Case>
                    </TGui.Switch>

                    <TGui.Stack>
                        <TurtleButton
                            variant={"outlined"}
                            onClick={createAssetPressed}
                            label={"core.create.asset"}
                        />
                    </TGui.Stack>


                </Stack>
            </Box>


        </TurtleOffcanvas>
    )
}


function getCreateFunction(assetType: string) {
    if (assetType === Assets.Panorama.TYPE) {
        return AssetsApi.CreatePanorama
    } else {
        return async () => {
            //pass
        }
    }
}

