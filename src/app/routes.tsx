import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Schedule } from "./pages/Schedule";
import { Speakers } from "./pages/Speakers";
import { Venue } from "./pages/Venue";
import { Registration } from "./pages/Registration";
import { Sponsors } from "./pages/Sponsors";
import { FAQ } from "./pages/FAQ";
import { Login } from "./pages/Login";
import { Bookings } from "./pages/Bookings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "schedule", Component: Schedule },
      { path: "speakers", Component: Speakers },
      { path: "venue", Component: Venue },
      { path: "registration", Component: Registration },
      { path: "sponsors", Component: Sponsors },
      { path: "faq", Component: FAQ },
      { path: "bookings", Component: Bookings },
    ],
  },
  { path: "/login", Component: Login },
]);