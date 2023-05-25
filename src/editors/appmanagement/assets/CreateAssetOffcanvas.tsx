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

interface CreateAssetOffcanvasProps {
    onClose?: () => void
    onRefresh?: () => void

    assetType: string,

}

export default function CreateAssetOffcanvas(props: CreateAssetOffcanvasProps) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const [cpp] = React.useState<CreateAssetParamas | any>({
        name: "",
        description: "",
        assetType: props.assetType,

    })

    const createAssetPressed = () => {
        lock.lock()

        if (props.onClose) {
            props.onClose()
        }

        AssetsApi.CreateAsset(cpp).then(() => {
            lock.unlock()

            if (props.onRefresh) {
                props.onRefresh()
            }
        })
    }

    const pNameChanged = (e: SyntheticEvent) => {
        cpp.name = e.target.value

    }

    const descChanged = (e: SyntheticEvent) => {
        cpp.description = e.target.value
    }


    return (
        <TurtleOffcanvas
            onClose={props.onClose}
            closeEnabled={true}

            header={<Offcanvas.Title>{t("core.create.asset")}</Offcanvas.Title>}
        >

            <Box style={{padding: "15px"}}>
                <Stack spacing={2}>

                    <TurtleTextField
                        onChange={pNameChanged}
                        label={"project.name"}
                    />

                    <TurtleTextField
                        onChange={descChanged}
                        label={"project.description"}
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