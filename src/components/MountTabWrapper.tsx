import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import {MiddleSpinner} from "@components/Spinners";

export default function MountTabWrapper({children}) {
    return (
        <ErrorBoundary>
            <React.Suspense fallback={<MiddleSpinner/>}>
                {React.Children.toArray(children)}
            </React.Suspense>
        </ErrorBoundary>
    )
}