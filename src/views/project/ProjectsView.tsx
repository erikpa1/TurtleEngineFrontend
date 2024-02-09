import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {useTranslation} from "react-i18next";
import TauriOsPlugin from "../../tauri/plugin_os";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {Button, Container, Divider, Drawer, IconButton, Modal, TextField} from "@mui/material";
import InputBase from "@mui/material/InputBase";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {CreateProjectParams, LastProjectInfo} from "@api/project/params";
import ProjectApi from "@api/project/ProjectApi";


import FolderIcon from '@mui/icons-material/Folder'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {MiddleSpinner} from "@components/Spinners";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function ProjectsView({}) {

    const [t] = useTranslation()


    return (

        <Stack gap={1}>

            <Paper
                sx={{p: '2px 4px', display: 'flex', alignItems: 'left'}}
            >
                <_OpenProjectButton/>
                <_CreateProjectButton/>

                <_SearchLabel/>

            </Paper>

            <_ProjectsList filterKey={""}/>

        </Stack>


    )
}

function _OpenProjectButton({}) {

    const [t] = useTranslation()

    function _openProjectPressed() {
        PlatformDispatcher.OpenTurtleProjectDialog().then((val) => {
            console.log(val)
        })
    }

    return (
        <IconButton
            color={"warning"}
            onClick={_openProjectPressed}
        >
            <FolderIcon/>
        </IconButton>
    )
}

function _CreateProjectButton({}) {

    const [t] = useTranslation()

    const [visible, setVisible] = React.useState(false)

    return (
        <>
            <IconButton
                color={"success"}
                onClick={() => setVisible(true)}
            >
                <CreateNewFolderRoundedIcon/>
            </IconButton>

            <_CreateProjectDrawer
                visible={visible}
                onHide={() => setVisible(false)}
            />
        </>
    )
}

function _CreateProjectDrawer({visible, onHide}) {

    const [t] = useTranslation()

    const lock = useGlobalAppLock()

    const [projectName, setProjectName] = React.useState("My project")
    const [projectAuthor, setProjectAuthor] = React.useState("Erik")
    const [projectDescription, setProjectDescription] = React.useState("")

    async function _createProjectPressed() {
        onHide()

        lock.lock()

        const path = await PlatformDispatcher.OpenFolderDialog(t("create.project"))

        const params = new CreateProjectParams()
        params.name = projectName
        params.folder = path
        params.author = projectAuthor
        params.description = projectDescription

        await ProjectApi.CreateProject(params)


        lock.unlock()
    }

    return (
        <Drawer
            open={visible}
            onClose={onHide}
            anchor={"right"}
            title={t("project.create") ?? ""}
        >
            <Container
                style={{
                    width: "20em",
                    padding: "1em"
                }}
            >

                <Stack gap={2}>
                    <TextField
                        label={`${t("name")}:`}
                        size="small"
                        value={projectName}
                    />


                    <TextField
                        label={`${t("author")}:`}
                        size="small"
                        value={projectAuthor}
                    />

                    <TextField
                        label={`${t("description")}:`}
                        size="small"
                        value={projectDescription}
                    />


                    <Button
                        onClick={_createProjectPressed}
                    >
                        {t("create")}
                    </Button>
                </Stack>
            </Container>

        </Drawer>
    )
}

function _SearchLabel({}) {

    const [t] = useTranslation()

    return (
        <>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={t("search") ?? ""}
                inputProps={{'aria-label': 'search google maps'}}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchRoundedIcon/>
            </IconButton>
        </>

    )
}

interface _ProjectsListProps {
    filterKey: string
}

function _ProjectsList({filterKey}: _ProjectsListProps) {

    const [isLoading, setIsLoading] = React.useState(true)

    const [visibleProjects, setVisibleProjects] = React.useState<Array<LastProjectInfo>>([])
    const [projects, setProjects] = React.useState<Array<LastProjectInfo>>([])

    async function refreshProjects() {
        setIsLoading(true)
        const data = await ProjectApi.GetLastProjects()
        setVisibleProjects(data)
        setProjects(data)
        setIsLoading(false)
    }

    React.useEffect(() => {
        if (isLoading) {
            refreshProjects()
        } else {
            //pass
        }
    }, [])

    if (isLoading) {
        return (<MiddleSpinner/>)
    } else {
        return (
            <>
                {
                    visibleProjects.map((val) => {
                        return (
                            <Paper
                                sx={{p: '2px 4px', display: 'flex', alignItems: 'left'}}
                            >
                                <IconButton
                                    color={"success"}
                                >
                                    <CreateNewFolderRoundedIcon/>
                                </IconButton>
                                {val.path}
                            </Paper>
                        )
                    })
                }
            </>
        )
    }

}