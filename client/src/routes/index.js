import Feeling from "../components/Feeling";
import Understanding from "../components/Understanding";
import Support from "../components/Support";
import Comments from "../components/Comments";
import Review from "../components/Review";
import Admin from "../components/Admin";

export const routes = [
  {
    path: "/feeling",
    component: Feeling,
  },
  {
    path: "/understanding",
    component: Understanding,
  },
  {
    path: "/support",
    component: Support,
  },
  {
    path: "/comments",
    component: Comments,
  },
  {
    path: "/review",
    component: Review,
  },
  {
    path: "/admin",
    component: Admin,
  },
];
