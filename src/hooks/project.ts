import React from "react";
import {ProjectLight} from "@data/project/ProjectLight";
import ProjectApi from "@api/project/ProjectApi";

export function useAvailableProjects(): [projects: Array<ProjectLight>, isLoading: boolean, refresh: () => void] {

    const [isLoading, setIsLoading] = React.useState(true)

    const [projects, setProjects] = React.useState([])

    const refresh = () => {
        setIsLoading(true)
        ProjectApi.ListProjects().then((value) => {
            setProjects(value)
            setIsLoading(false)
        })

    }

    React.useEffect(refresh, [])

    return [projects, isLoading, refresh]

}

export function useLoadProjectLight(projectUid: string): [project: ProjectLight | null, isLoading: boolean] {

    const [isLoading, setIsLoading] = React.useState(true)

    const [project, setProject] = React.useState(null)

    React.useEffect(() => {
        setIsLoading(true)
        ProjectApi.GetProjectLight(projectUid).then((value) => {
            setProject(value)
            setIsLoading(false)
        })

    }, [projectUid])

    return [project, isLoading]

}