import {CircularProgress} from "@mui/material";
import {TGui} from "@external/tgui";

export function MiddleSpinner({}) {
    return (
        <TGui.Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </TGui.Box>
    )
}