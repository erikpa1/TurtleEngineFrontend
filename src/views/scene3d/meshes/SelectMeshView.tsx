import React from "react";
import ProjectApi from "@api/project/ProjectApi";
import TurtleFile from "@api/project/files";
import {CircularProgress, Modal} from "@mui/material";
import FilesView from "@views/files/FilesView";


export default function SelectMeshView({}) {

    const [isLoading, setIsLoading] = React.useState(true)
    const [files, setFiles] = React.useState<Array<TurtleFile>>([])

    async function refresh() {
        setIsLoading(true)
        const data = await ProjectApi.GetProjectFiles("", ["glb", "gltf"])
        setFiles(data)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <CircularProgress/>
        )
    } else {
        return (
            <FilesView files={files}/>
        )
    }

}

export function SelectMeshViewModal() {

    return (
        <div>

        </div>
    )

}