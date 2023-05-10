import React from "react";
import {ProjectLight} from "@data/project/ProjectLight";
import ProjectApi from "@api/project/ProjectApi";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";

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

export function useActivateAndDispatchProject(): [(project: ProjectLight) => void] {

    const projectZus = useActiveProjectZus()

    const activateProject = (project: ProjectLight) => {
        ProjectApi.GetAndActivateProject(project.uid).then((data) => {
            projectZus.setProject(project)
        })
    }

    return [activateProject]


}