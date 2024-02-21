import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton from "@components/TopBarButton";
import Icons from "@icons/Icons";
import {useTranslation} from "react-i18next";
import {Drawer, Modal} from "@mui/material";
import FilesView, {AllFilesView} from "@views/files/FilesView";
import TurtleFile from "@api/project/files";
import ProjectApi from "@api/project/ProjectApi";
import PlayerIcon from "@icons/res/Player.svg";
import SoundIcon from "@icons/res/Sound.svg";
import QuizIcon from "@icons/res/Quiz.svg";


export default function Scene3D_TBS_Boards({}) {
    return (
        <Stack direction={"row"}>
            <_AddIcons/>
        </Stack>
    )
}

function _AddIcons({}) {

    const [t] = useTranslation()

    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.Video}
                lang={t("video")}
                onClick={() => setShow(true)}
            />

            <TopBarButton
                icon={Icons.Sound}
                lang={t("sound")}
                onClick={() => setShow(true)}
            />

            <TopBarButton
                icon={Icons.Quiz}
                lang={t("quiz")}
                onClick={() => setShow(true)}
            />

        </>
    )
}
