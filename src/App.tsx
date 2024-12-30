import "./App.css";
import { RouterProvider } from "react-router";
import appRouter from "./app.router";
import { AuthenticatedProvider } from "./shared/Authenticated";
import { Provider } from "react-redux";
import store from "./redux/stores";
import ToastConfig from "./services/configurations/ToastConfig";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthenticatedProvider>
          <RouterProvider router={appRouter} />
        </AuthenticatedProvider>
      </Provider>

      <ToastConfig />
    </>
  );
}

export default App;
