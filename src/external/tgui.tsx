import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {Box, MenuItem, Select, Tab, Tabs} from "@mui/material";

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

export const TGui = {
    T: useTranslation,
    Row: Row,
    Col: Col,
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
    Select: Select,
    TSelect: TurtleSelectField,

    BtnSwitch: Switch,

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
    TextMicro: _TextMicro

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