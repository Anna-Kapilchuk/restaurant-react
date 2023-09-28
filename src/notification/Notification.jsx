import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { SetNotificationContext } from "../restaurantContext/NotificationContext";

const Notification = ({children}) => {

    const [notification, setNotification] = useState({
        open: false,
        msg: '',
        severity: 'success'
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        //   return;
        }

        setNotification({...notification, open: false});
    };

    return(
        <>
        <SetNotificationContext.Provider value={setNotification}>
            {children}
        </SetNotificationContext.Provider>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
                // message={notification.msg}
                // action={action}
                >

                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.msg}
                </Alert>

            </Snackbar>
        </>
    )
}

export default Notification