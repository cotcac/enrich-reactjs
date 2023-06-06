import logo from "./logo.svg";
import "./App.css";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./components/layout";
import Contact from "./components/contact";
import NotFound from "./components/NotFound";
import Topic from "./components/Topic";
import Register from "./components/Register";
import Login from "./components/Login";
import WritePost from "./components/write";
import ReadPost from "./components/ReadPost";
import ListPost from "./components/ListPosts";
import SearchPost from "./components/searchPost";

// import About from "./components/about";
const About = lazy(() => import("./components/about"));

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
        {  path: "list", element: <ListPost />,},
        {  path: "search", element: <SearchPost />},
        {  path: "write/:id", element: <WritePost />,},
        {  path: "read/:id", element: <ReadPost />,},
        {  path: "*", element: <NotFound />,},
      ],
    },
  ]);

  return element;
}

export default App;
