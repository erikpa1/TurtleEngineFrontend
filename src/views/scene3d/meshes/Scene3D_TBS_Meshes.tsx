import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton from "@components/TopBarButton";
import Icons from "@icons/Icons";
import {useTranslation} from "react-i18next";


export default function Scene3D_TBS_Meshes({}) {
    return (
        <Stack direction={"row"}>

            <_AddMesh/>


        </Stack>
    )
}

function _AddMesh({}) {

    const [t] = useTranslation()


    return (
        <>
            <TopBarButton
                icon={Icons.Mesh}
                lang={t("add.mesh")}
            />
        </>
    )
}
