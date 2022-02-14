// Packages
import { RouteProps } from "react-router-dom";

//Pages
import Home from "../pages/home/Home";
import ViewContact from "../pages/view-contact/ViewContact";

export type RoutePropsWithName = RouteProps & { name?: string; requiresLogin: boolean };

export const routes: RoutePropsWithName[] = [
  {
    element: <Home />,
    name: "Home",
    path: "/",
    requiresLogin: false,
  },
  {
    element: <ViewContact />,
    name: "View Contact",
    path: "/view-contact/:id",
    requiresLogin: false,
  },
];
