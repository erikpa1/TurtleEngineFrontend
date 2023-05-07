import React from "react";
import {ProjectLight} from "@data/project/ProjectLight";
import ProjectApi from "@api/project/ProjectApi";

export function useAvailableProjects(): [projects: Array<ProjectLight>, isLoading: boolean] {

    const [isLoading, setIsLoading] = React.useState(true)

    const [projects, setProjects] = React.useState([])

    React.useEffect(() => {
        setIsLoading(true)
        ProjectApi.ListProjects().then((value) => {
            setProjects(value)
            setIsLoading(false)
        })

    }, [])

    return [projects, isLoading]

}