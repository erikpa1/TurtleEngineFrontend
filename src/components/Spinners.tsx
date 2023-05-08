import {Box, CircularProgress} from "@mui/material";

export function MiddleSpinner({}) {
    return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    )
}