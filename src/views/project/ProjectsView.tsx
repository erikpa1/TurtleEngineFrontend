import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {useTranslation} from "react-i18next";
import PlatformDispatcher from "@api/PlatformDispatcher";
import {Button, Container, Divider, Drawer, IconButton, Modal, TextField} from "@mui/material";
import InputBase from "@mui/material/InputBase";

import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {CreateProjectParams, LastProjectInfo} from "@api/project/params";
import ProjectApi from "@api/project/ProjectApi";
import FolderIcon from '@mui/icons-material/Folder'
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {DefaultSkeleton, MiddleSpinner} from "@components/Spinners";
import {DeleteForeverRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import TauriProjectsPlugin from "../../tauri/plugin_projects";
import RoutesApi from "@app/RoutesApi";
import FsTools from "@api/FsTools";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function ProjectsView({onProjectPicked}) {

    const [t] = useTranslation()

    const listRef = React.useRef<any>()

    function refreshProjects() {
        listRef.current && listRef.current.refreshProjects()
    }

    return (

        <Stack gap={1}>

            <Paper
                sx={{p: '2px 4px', display: 'flex', alignItems: 'left'}}
            >
                <_OpenProjectButton/>
                <_CreateProjectButton onRefresh={refreshProjects}/>

                <_SearchLabel/>

            </Paper>

            <_ProjectsList
                ref={listRef}
                filterKey={""}
                onProjectPicked={onProjectPicked}
            />

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

function _CreateProjectButton({onRefresh}) {

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
                onRefresh={onRefresh}
                onHide={() => setVisible(false)}
            />
        </>
    )
}

function _CreateProjectDrawer({visible, onHide, onRefresh}) {

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

        onRefresh()
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
                        onChange={(e) => {
                            setProjectName(e.target.value)
                        }}
                    />


                    <TextField
                        label={`${t("author")}:`}
                        size="small"
                        value={projectAuthor}
                        onChange={(e) => {
                            setProjectAuthor(e.target.value)
                        }}
                    />

                    <TextField
                        label={`${t("description")}:`}
                        size="small"
                        value={projectDescription}
                        onChange={(e) => {
                            setProjectDescription(e.target.value)
                        }}
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
    onProjectPicked: (project: LastProjectInfo) => void
}

const _ProjectsList = React.forwardRef(({filterKey, onProjectPicked}: _ProjectsListProps, ref) => {

    const [t] = useTranslation()
    const navigate = useNavigate()

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

    async function projectActivated(project: LastProjectInfo) {
        if (PlatformDispatcher.IsDesktop()) {
            const data = await TauriProjectsPlugin.ActivateProject(project.path)

            if (data.ok) {
                navigate(RoutesApi.GetScenesRoute(project.uid))
                onProjectPicked(project)
            }
        }
    }

    async function deleteCached(path: string) {
        setIsLoading(true)
        await ProjectApi.DeleteCached(path)
        refreshProjects()
    }

    React.useImperativeHandle(ref, () => ({
        refreshProjects
    }))

    React.useEffect(() => {
        if (isLoading) {
            refreshProjects()
        } else {
            //pass
        }
    }, [])

    if (isLoading) {
        return (<DefaultSkeleton count={10}/>)
    } else {
        return (
            <>
                {
                    visibleProjects.map((val) => {
                        return (
                            <Paper
                                key={val.path + val.uid}
                                sx={{
                                    p: '2px 4px', display: 'flex', alignItems: 'left',
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    projectActivated(val)
                                }}

                            >
                                <IconButton
                                    color={val.exists ? "success" : "error"}
                                >
                                    <CreateNewFolderRoundedIcon/>
                                </IconButton>

                                <Stack>
                                    <div>{val.name}.turtle</div>
                                    <div>{val.path}</div>
                                </Stack>


                                {
                                    val.exists === false &&
                                    <IconButton
                                        color={"error"}
                                        onClick={() => {
                                            deleteCached(val.path)
                                        }}
                                    >
                                        <DeleteForeverRounded/>
                                    </IconButton>
                                }


                            </Paper>
                        )
                    })
                }
            </>
        )
    }

})