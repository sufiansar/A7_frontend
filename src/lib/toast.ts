import toast from "react-hot-toast";

// Custom toast configurations for consistent styling
export const showSuccessToast = (message: string, emoji?: string) => {
  toast.success(emoji ? `${message} ${emoji}` : message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#10B981",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "16px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#10B981",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#EF4444",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "16px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#EF4444",
    },
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
    style: {
      background: "#374151",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "16px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  });
};

export const showInfoToast = (message: string) => {
  toast(message, {
    duration: 4000,
    position: "top-right",
    icon: "ℹ️",
    style: {
      background: "#3B82F6",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "8px",
      padding: "16px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  });
};
