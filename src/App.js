import logo from "./logo.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import About from "./components/about";
import Layout from "./components/layout";
import Contact from "./components/contact";
import NotFound from "./components/NotFound";
import Topic from "./components/Topic";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {  path: "topic", element: <Topic />,},
        {  path: "register", element: <Register />,},
        {  path: "login", element: <Login />,},
        {  path: "*", element: <NotFound />,},
      ],
    },
  ]);

  return element;
}

export default App;
