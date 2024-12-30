import { ToastContainer } from "react-toastify";

function ToastConfig() {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={true}
      draggable
      autoClose={2000}
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  );
}

export default ToastConfig;
