import {TGui} from "@external/tgui";
import React from "react";
import {VtsPanelHeading} from "@players/vts/player-guis/Common";
import FsTools from "@api/FsTools";
import {useNavigate} from "react-router-dom";


export function MiddlePanel({}) {

    const [t] = TGui.T()

    return (

        <TGui.Card style={{
            backgroundColor: TGui.Colors.WhiteMiddle,
            padding: "0.5em",
            height: "100%"
        }}>

            <div style={{textAlign: "center"}}>
                <VtsPanelHeading text={t("preview")}/>
            </div>

            <TGui.Stack gap={3}>
                <TGui.Card>
                    <img
                        style={{
                            height: "500px",
                            width: "100%",
                            margin: "1em",
                            objectFit: "contain"
                        }}
                        src={FsTools.ConvertFilePath(FsTools.GetPlatformPath("Images/VtsDefaultPreview.png"))}
                    />
                </TGui.Card>

                <_BottomBar/>
            </TGui.Stack>


        </TGui.Card>

    )
}


function _BottomBar({}) {

    const [t] = TGui.T()


    const navigate = useNavigate()

    function unloadPressed() {
        setVisibleGui(<_LoadView onLoad={loadPressed}/>)
    }

    function playPressed() {
        setVisibleGui(<_PauseView onPause={pausePressed}/>)

        navigate("/play")
    }

    function pausePressed() {
        setVisibleGui(<_PlayUnloadView onPlay={playPressed} onUnload={unloadPressed}/>)
    }

    function loadPressed() {

        setVisibleGui(<_PlayUnloadView onPlay={playPressed} onUnload={unloadPressed}/>)
    }


    const [visibleGui, setVisibleGui] = React.useState(<_LoadView onLoad={loadPressed}/>)


    return (
        <TGui.Stack direction={"horizontal"} gap={3}>
            {visibleGui}
        </TGui.Stack>
    )
}


function _CardWrapper({children, onClick}) {
    return (
        <TGui.Card
            style={{
                cursor: "pointer",
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
                padding: "1em"
            }}
            onClick={onClick}
        >
            {React.Children.toArray(children)}
        </TGui.Card>
    )
}

function _LoadView({onLoad}) {

    const [t] = TGui.T()


    return (
        <_CardWrapper onClick={onLoad}>
            <TGui.Stack
                direction={"horizontal"}
                gap={2}
            >
                <TGui.IconClickButton
                    image={"/icons/Load.svg"}
                />

                <h3>{t("load")}</h3>

            </TGui.Stack>
        </_CardWrapper>

    )
}

function _PlayUnloadView({onUnload, onPlay}) {


    const [t] = TGui.T()


    return (
        <TGui.Stack gap={3}
                    direction={"horizontal"}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
        >

            <_CardWrapper onClick={onUnload}>
                <TGui.Stack
                    direction={"horizontal"}
                    gap={2}
                >
                    <TGui.IconClickButton
                        image={"/icons/Stop.svg"}
                    />

                    <h3>{t("unload")}</h3>

                </TGui.Stack>
            </_CardWrapper>

            <_CardWrapper onClick={onPlay}>
                <TGui.Stack
                    direction={"horizontal"}
                    gap={2}
                >
                    <TGui.IconClickButton
                        image={"/icons/Play.svg"}
                    />

                    <h3>{t("play")}</h3>

                </TGui.Stack>
            </_CardWrapper>
        </TGui.Stack>
    )
}

function _PauseView({onPause}) {

    const [t] = TGui.T()

    return (
        <TGui.Stack gap={3}
                    direction={"horizontal"}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
        >

            <_CardWrapper onClick={onPause}>
                <TGui.Stack
                    direction={"horizontal"}
                    gap={2}
                >
                    <TGui.IconClickButton
                        image={"/icons/Pause.svg"}
                    />

                    <h3>{t("pause")}</h3>
                </TGui.Stack>
            </_CardWrapper>
        </TGui.Stack>
    )

}