import React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Typography
} from "@mui/material";
import TurtleFile from "@api/project/files";
import ProjectApi from "@api/project/ProjectApi";
import Stack from "@mui/material/Stack";
import {MiddleSearchBar} from "@components/SearchBar";
import FilesView from "@views/files/FilesView";

export default function Scene3D_SB_FilesView({}) {

    const [isLoading, setIsLoading] = React.useState(true)
    const [files, setFiles] = React.useState<Array<TurtleFile>>([])

    async function _refresh() {
        setIsLoading(true)
        const response = await ProjectApi.GetProjectFiles("")
        setFiles(response)
        setIsLoading(false)
    }

    React.useEffect(() => {
        _refresh()
    }, [])

    if (isLoading) {
        return (
            <Container>
                <CircularProgress/>
            </Container>
        )
    } else {
        return (
            <Container>
                <FilesView files={files}/>
            </Container>
        )
    }
}

