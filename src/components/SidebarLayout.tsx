import React from "react";
import "./SidebarLayout.css";

export default function SidebarLayout({children}) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const navbar = document.getElementById("navbar");
    const [isResizing, setIsResizing] = React.useState(false);
    const [sidebarWidth, setSidebarWidth] = React.useState(20);

    const contentMinWidth = 20;
    const sideBarMinWidth = 20;

    const startResizing = React.useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent) => {
            if (isResizing && containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newSidebarWidth =
                    ((containerWidth -
                            (mouseMoveEvent.clientX - (navbar ? navbar.offsetWidth : 0))) /
                        containerWidth) *
                    100;
                if (
                    newSidebarWidth > sideBarMinWidth &&
                    newSidebarWidth < 100 - contentMinWidth
                ) {
                    setSidebarWidth(newSidebarWidth);
                }
            }
        },
        [isResizing]
    );

    React.useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div
            className="sidebar-container"
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                position: "relative",
                background: "#272730",
                overflowY: "hidden",
                overflowX: "hidden",
                touchAction: "none",
                backgroundColor: "#f4f5f7",
            }}
            ref={containerRef}
        >
            <div
                className="content"
                style={{
                    minWidth: "20%",
                    position: "relative",
                    width: `${100 - sidebarWidth}%`, // Set the content width based on the sidebar width
                    height: "100%",
                    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
            >
                {children[0]}
                <div
                    className="sidebar-resizer-content"
                    style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        width: "5px",
                        height: "100%",
                        cursor: "ew-resize",
                        resize: "horizontal",
                    }}
                    onMouseDown={startResizing}
                />
            </div>

            <div
                className="sidebar-resizer"
                style={{
                    flexBasis: "10px",
                    cursor: "ew-resize",
                    resize: "horizontal",
                    background: "#ebebeb",

                }}
                onMouseDown={startResizing}
            />

            <div
                className="sidebar"
                style={{
                    minWidth: "20%",
                    flex: `${sidebarWidth}%`, // Set the sidebar width as a percentage
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    backgroundColor: "#6f6f6",
                    overflow: "auto",
                }}
            >
                <div
                    className="sidebar-content"
                    style={{
                        width: "100%",
                    }}
                >
                    {children[1]}
                </div>
            </div>
        </div>
    );
}
