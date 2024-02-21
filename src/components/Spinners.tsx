import {Box, CircularProgress, Container, Skeleton} from "@mui/material";
import Aliased from "@components/Aliased";


export function MiddleSpinner({}) {
    return (
        <Container>
            <CircularProgress/>
        </Container>
    )
}

interface DefaultSkeletonProps {
    count?: number
}

export function DefaultSkeleton({count}: DefaultSkeletonProps) {

    const elements: Array<any> = []

    for (let i = 0; i < (count ?? 1); i++) {
        elements.push(<Skeleton animation={"wave"} height={70}/>)
    }

    return (
        <Aliased.Box
            sx={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
            }}

        >
            {elements}
        </Aliased.Box>
    )
}