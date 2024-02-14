import React from "react";

import {MiddleSearchBar} from "@components/SearchBar";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import TurtleFile from "@api/project/files";
import ProjectApi from "@api/project/ProjectApi";


interface FilesViewProps {
    files: Array<TurtleFile>
    onPicked: (file: TurtleFile) => void
}

export default function FilesView({files, onPicked}: FilesViewProps) {
    return (
        <>
            <div style={{
                height: "45px",
                marginTop: "25px",
                marginBottom: "25px",
            }}>
                <MiddleSearchBar/>
            </div>
            <Grid container spacing={2} justifyContent="left">
                {
                    files.map((val) => {
                        return (
                            <Grid key={val.path}>
                                <_FileCard file={val} onPicked={onPicked}/>
                            </Grid>

                        )
                    })
                }
            </Grid>

        </>
    )
}

interface _FileCardProps {
    file: TurtleFile
    onPicked: (file: TurtleFile) => void
}

function _FileCard({file, onPicked}: _FileCardProps) {

    const ICON = file.is_file ? "/icons/Connection.svg" : "/icons/Projects.svg"

    return (
        <div style={{
            margin: "2.5px",
        }}>
            <Card
                sx={{maxWidth: 100}}
                onClick={() => {
                    onPicked(file)
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="100"
                        width="auto"
                        image={ICON}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="body2" component="div">
                            {file.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export function AllFilesView({}) {

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
            <CircularProgress/>
        )
    } else {
        return (<FilesView files={files} onPicked={() => {
            //pass
        }}/>)
    }

}