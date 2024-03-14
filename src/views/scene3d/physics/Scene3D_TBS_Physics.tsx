import React from "react";
import Stack from "@mui/material/Stack";
import TopBarButton, {TopBarSeparator} from "@components/TopBarButton";
import Icons from "@icons/Icons";
import {useTranslation} from "react-i18next";

export default function Scene3D_TBS_Physics() {
    return (
        <Stack direction={"row"}>
            <_AddBox/>
            <_AddAvatar/>
            <_AddCapsule/>
            <_AddSphere/>
            <_AddJoint/>
            <TopBarSeparator/>
        </Stack>
    )
}

function _AddBox({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.PhysicsBox}
                lang={t("physics.box")}
                onClick={() => setShow(true)}
            />

        </>
    )
}

function _AddAvatar({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.PhysicsAvatar}
                lang={t("physics.avatar")}
                onClick={() => setShow(true)}
            />

        </>
    )
}

function _AddCapsule({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.PhysicsCapsule}
                lang={t("physics.capsule")}
                onClick={() => setShow(true)}
            />

        </>
    )
}

function _AddSphere({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.PhysicsSphere}
                lang={t("physics.sphere")}
                onClick={() => setShow(true)}
            />

        </>
    )
}

function _AddJoint({}) {
    const [t] = useTranslation()
    const [show, setShow] = React.useState(false)

    return (
        <>
            <TopBarButton
                icon={Icons.PhysicsJoint}
                lang={t("physics.joint")}
                onClick={() => setShow(true)}
            />

        </>
    )
}





