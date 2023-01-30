import { toast } from "react-toastify";

type MessageType = "error" | "success";

export const notificationMessage = (type: MessageType, message: string) => {
  if (type === "error") {
    return toast.error(message, { position: "bottom-right" });
  }
  return toast.success(message, { position: "bottom-right" });
};
