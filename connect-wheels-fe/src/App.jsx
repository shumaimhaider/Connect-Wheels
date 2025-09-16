import { store } from "./redux/store";
import { Provider } from "react-redux";

import LoginPage from "./auth-pages/login-page";
import SignupPage from "./auth-pages/sign-up-page";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
}

export default App;
