import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {Box, MenuItem, Select, Tab, Tabs} from "@mui/material";

import {Col, Offcanvas, Row, Stack} from "react-bootstrap";
import {MiddleSearchBar} from "@components/SearchBar";

import Switch, {Case} from "react-switch-case/lib/esm";

import TurtleOffcanvas from "@components/Drawers";
import {useTranslation} from "react-i18next";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TurtleSelectField, TurtleSingleFileInput} from "@platform/components/TurtleForms";
import {Default} from "react-switch-case";
import React from "react";

export const TGui = {
    T: useTranslation,
    Row: Row,
    Col: Col,
    Offcanvas: TurtleOffcanvas,
    OffcanvasTitle: Offcanvas.Title,
    Box: Box,
    Card: Card,
    CardHeader: CardHeader,
    CardMedia: CardMedia,
    CardContent: CardContent,
    Typography: Typography,
    CardActions: CardActions,
    Button: TurtleButton,
    Select: Select,
    TSelect: TurtleSelectField,

    MenuItem: MenuItem,
    Stack: Stack,
    MiddleSearchBar: MiddleSearchBar,
    Switch: Switch as TSwitch | any,
    Case: Case as TCase | any,
    Default: Default as any,
    Tabs: Tabs,
    Tab: Tab,
    PopupZus: useGlobalPopup,
    SingleFileInput: TurtleSingleFileInput,
    TextMicro: _TextMicro

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