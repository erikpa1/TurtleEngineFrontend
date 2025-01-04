import React from "react";
import {Project} from "@data/project/Project";
import ProjectApi from "@api/project/ProjectApi";
import {useActiveProjectZus} from "@platform/zustands/projectZuses";

export function useAvailableProjects(): [projects: Array<Project>, isLoading: boolean, refresh: () => void] {

    const [isLoading, setIsLoading] = React.useState(true)

    const [projects, setProjects] = React.useState<Array<Project>>([])

    async function refresh() {
        setIsLoading(true)
        ProjectApi.ListProjects().then((value) => {
            setProjects(value)
            setIsLoading(false)
        })

    }

    React.useEffect(() => {
        refresh()
    }, [])

    return [projects, isLoading, refresh]

}

export function useLoadProjectLight(projectUid: string): [project: Project | null, isLoading: boolean] {

    const [isLoading, setIsLoading] = React.useState(true)

    const [project, setProject] = React.useState<Project | null>(null)

    React.useEffect(() => {
        setIsLoading(true)
        ProjectApi.GetProjectLight(projectUid).then((value) => {
            setProject(value)
            setIsLoading(false)
        })

    }, [projectUid])

    return [project, isLoading]

}

export function useActivateAndDispatchProject(): [(project: Project) => void] {

    const projectZus = useActiveProjectZus()

    const activateProject = (project: Project) => {
        ProjectApi.GetAndActivateProject(project.uid).then((data) => {
            projectZus.setProject(project)
        })
    }

    return [activateProject]


}