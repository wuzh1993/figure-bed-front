import Index from "../pages/main/Main";
import Login from "../pages/login/Login";

const routerConfig = [
  { path: "/", name: "Index", component: Index, auth: true },
  { path: "/login", name: "Login", component: Login, auth: false },
];

export default routerConfig;
