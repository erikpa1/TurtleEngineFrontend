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

interface CreateAssetOffcanvasProps {
    onClose?: () => void
    onRefresh?: () => void

    assetType: string,

}

export default function CreateAssetOffcanvas(props: CreateAssetOffcanvasProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const projectZus = useActiveProjectZus()

    const [cap] = React.useState<CreateAssetParamas | any>({
        name: "",
        description: "",
        assetType: props.assetType,
        project_uid: projectZus.project.uid
    })

    const createAssetPressed = () => {
        lock.lock()

        if (props.onClose) {
            props.onClose()
        }

        AssetsApi.CreateAsset(cap).then(() => {
            lock.unlock()

            if (props.onRefresh) {
                props.onRefresh()
            }
        })
    }

    const pNameChanged = (e: SyntheticEvent) => {
        cap.name = e.target.value

    }

    const descChanged = (e: SyntheticEvent) => {
        cap.description = e.target.value
    }


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


                </Stack>
            </Box>


            <TurtleButton
                onClick={createAssetPressed}
                label={"core.create.asset"}
            />

        </TurtleOffcanvas>
    )
}