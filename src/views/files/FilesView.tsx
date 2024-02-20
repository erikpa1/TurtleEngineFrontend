import React from "react";

import {MiddleSearchBar} from "@components/SearchBar";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import TurtleFile from "@api/project/files";
import ProjectApi from "@api/project/ProjectApi";

import {FileDrop} from "react-file-drop";


import {listen} from '@tauri-apps/api/event'
import PlatformDispatcher from "@api/PlatformDispatcher";

interface FilesViewProps {
    files: Array<TurtleFile>
    onPicked: (file: TurtleFile) => void
}

export default function FilesView({files, onPicked}: FilesViewProps) {
    return (
        <>
            <MultiplatformDngBox/>

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


export function MultiplatformDngBox({}) {

    if (PlatformDispatcher.IsDesktop()) {
        return (<_DesktopDndBox onDropped={(e) => {
            console.log(e)
        }}/>)
    } else {
        return (<DnDBox1 onDropped={(e) => {
            console.log(e)
        }}/>)
    }

}

function _DesktopDndBox({onDropped}) {

    React.useEffect(() => {
        const unlisten = listen('tauri://file-drop', event => {
            onDropped(event)
        }) as any

        return () => {
            unlisten.then(f => {
                console.log("Unmounting file drop")
                f()
            })
        }
    }, [])


    return (
        <div style={{
            position: "absolute",
            left: 0,
            top: 0
        }}>

        </div>
    )
}

export function DnDBox1({onDropped}) {
    const styles = {border: '1px solid black', width: 600, color: 'black', padding: 20};


    return (
        <div>
            <h1>React File Drop demo</h1>
            <div style={styles}>
                <FileDrop
                    onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                    onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                    onFrameDrop={(event) => console.log('onFrameDrop', event)}
                    onDragOver={(event) => console.log('onDragOver', event)}
                    onDragLeave={(event) => console.log('onDragLeave', event)}
                    onDrop={(files, event) => console.log('onDrop!', files, event)}
                >
                    Drop some files here!
                </FileDrop>
            </div>
        </div>
    );

}


export function DnDBox() {


    const [dropActive, setDropActive] = React.useState(false)
    const filesDropped = (files) => {
        const fileArray = Array.from(files)
        fileArray.forEach((value) => {
            //Nothing yet
        })
    }

    return (
        <div style={{
            background: (dropActive ? "green" : null) as any,
            height: "100%",
            width: "100%"

        }}>
            <FileDrop
                onFrameDragEnter={(event) => setDropActive(true)}
                onFrameDragLeave={(event) => setDropActive(false)}
                onFrameDrop={(event) => setDropActive(false)}
                onDrop={(files, event) => {
                    console.log(files)
                    filesDropped(files)

                }}
            >
                <img src={"/icons/Deployment.svg"}
                     style={{
                         width: "50px",
                         height: "50px",
                         marginTop: "25px"
                     }}/>
            </FileDrop>
        </div>
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

