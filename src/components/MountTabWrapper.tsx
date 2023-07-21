import React from "react";
import ErrorBoundary from "@components/ErrorBoundary";

import {TGui} from "@external/tgui";

export default function MountTabWrapper({children}) {
    return (
        <ErrorBoundary>
            <React.Suspense fallback={<TGui.MiddleSpinner/>}>
                {React.Children.toArray(children)}
            </React.Suspense>
        </ErrorBoundary>
    )
}