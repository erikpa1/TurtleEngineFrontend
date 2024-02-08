import {useGlobalAppLock} from "@platform/zustands/globalAppLockZus";
import {CircularProgress} from "@mui/material";


export default function GlobalAppLock() {

    const locker = useGlobalAppLock()

    return (
        <div style={{
            position: "fixed",
            left: "0px",
            right: "0px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 150,
            visibility: locker.isAppLocked ? "visible" : "hidden"
        }}>
            <div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, 50%)"
            }}>
                <CircularProgress/>
            </div>
        </div>
    )
}