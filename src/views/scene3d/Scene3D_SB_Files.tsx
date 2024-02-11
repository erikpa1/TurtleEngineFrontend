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
                                    <_FileCard file={val}/>
                                </Grid>

                            )
                        })
                    }
                </Grid>


            </Container>
        )
    }

}

interface _FileCardProps {
    file: TurtleFile
}

function _FileCard({file}: _FileCardProps) {
    return (
        <div style={{
            margin: "2.5px",
        }}>
            <Card sx={{maxWidth: 100}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="100"
                        width="auto"
                        image="/icons/Projects.svg"

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