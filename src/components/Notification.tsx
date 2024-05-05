import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../utils/handlers/getFCMToken";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const notify = useCallback(() => toast(<ToastDisplay />), []);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification, notify]);

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default Notification;
