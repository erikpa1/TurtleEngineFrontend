import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import {TurtleButton} from "@platform/components/TurtleButtons";
import {Box, Tab, Tabs} from "@mui/material";

import {Offcanvas, Stack} from "react-bootstrap";
import {MiddleSearchBar} from "@components/SearchBar";

import Switch, {Case} from "react-switch-case/lib/esm";

import TurtleOffcanvas from "@components/Drawers";
import {useTranslation} from "react-i18next";
import {useGlobalPopup} from "@platform/zustands/globalPopupZus";
import {TurtleSingleFileInput} from "@platform/components/TurtleForms";

export const TGui = {
    T: useTranslation,
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
    Stack: Stack,
    MiddleSearchBar: MiddleSearchBar,
    Switch: Switch,
    Case: Case,
    Tabs: Tabs,
    Tab: Tab,
    PopupZus: useGlobalPopup,
    SingleFileInput: TurtleSingleFileInput

}

interface TSwitch  {
    condition: string | number | any
}