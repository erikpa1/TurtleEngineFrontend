import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const Aliased = {
    Box: Box as any,
    T: useTranslation
}

export default Aliased