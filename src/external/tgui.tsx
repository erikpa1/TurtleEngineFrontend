import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {Box, ButtonGroup, MenuItem, Popover, Select, Tab, Tabs} from "@mui/material";

import {Col, Modal, Offcanvas, Row, Stack} from "react-bootstrap";
import {MiddleSearchBar} from "@components/SearchBar";

import {default as IfSwitch, Case} from "react-switch-case/lib/esm";

import TurtleOffcanvas from "@components/Drawers";
import {useTranslation} from "react-i18next";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TurtleSelectField, TurtleSingleFileInput} from "@platform/components/TurtleForms";
import {Default} from "react-switch-case";

import {Switch} from "@mui/material";

import React from "react";
import {TurtleModal} from "@components/Modals";
import {ViewContainer} from "@components/ViewContainer";
import {MiddleSpinner} from "@components/Spinners";

export const TGui = {
    T: useTranslation,
    Row: Row,
    Col: Col,
    Popover: Popover,
    ViewContainer: ViewContainer,
    Modal: TurtleModal,
    ModalTitle: Modal.Title,
    Offcanvas: TurtleOffcanvas,
    OffcanvasTitle: Offcanvas.Title,
    Box: Box as any,
    PaperBox: _PaperBox as any,
    Card: Card,
    CardHeader: CardHeader,
    CardMedia: CardMedia,
    CardContent: CardContent,
    Typography: Typography,
    CardActions: CardActions,
    Button: TurtleButton,
    ButtonGroup: ButtonGroup,
    Select: Select,
    TSelect: TurtleSelectField,
    IconClickButton: _IconClickButton as React.FC<_IconClickButtonProps>,
    BtnSwitch: Switch,
    MiddleSpinner: MiddleSpinner,
    MenuItem: MenuItem,
    Stack: Stack,
    MiddleSearchBar: MiddleSearchBar,
    Switch: IfSwitch as TSwitch | any,
    Case: Case as TCase | any,
    Default: Default as any,
    Tabs: Tabs,
    Tab: Tab,
    PopupZus: useGlobalPopup,
    SingleFileInput: TurtleSingleFileInput,
    TextMicro: _TextMicro,
    Colors: {
        WhiteBack: "#e7ebf0",
        WhiteMiddle: "#f4f4f4",
        WhiteFront: "#ffffff",
    }

}

function _PaperBox({children}) {
    return (
        <TGui.Box
            sx={{borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper'}}
        >
            {React.Children.toArray(children)}
        </TGui.Box>
    )
}

interface TSwitch {
    condition: string | number | any
}

interface TCase {
    value: string | number | any
}

function _TextMicro({children}) {

    return (
        <Typography
            variant="body2"
            color="text.secondary"
            style={{
                maxHeight: "50px",
            }}
        >
            {React.Children.toArray(children)}
        </Typography>

    )
}

interface _IconClickButtonProps {
    ref?: any
    size?: string
    image: string
    onClick?: any
    style?: any

}

function _IconClickButton(props: _IconClickButtonProps) {

    const _size = props.size ?? "1.5em"

    return (
        <img
            ref={props.ref}
            style={{
                ...(props.style ?? {}),
                width: _size,
                height: _size,
                cursor: "pointer",
                objectFit: "contain"
            }}
            onClick={props.onClick}
            src={props.image}
        />
    )
}