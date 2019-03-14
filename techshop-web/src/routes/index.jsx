import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "layouts/Login/Login.jsx";

var indexRoutes = [
    { path: "/", name: "Home", component: Dashboard, exact: false },
    { path: "/login", name: "Login", component: Login, exact: true }
];

export default indexRoutes;
