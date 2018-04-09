import iziToast from "izitoast";

export const showInAppNotification = ({ title, message, backgroundColor }) => {
  iziToast.show({
    title,
    message,
    backgroundColor,
    position: "topCenter",
    theme: "dark",
    toastOnce: true
  });
};
