import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import Clients from "../views/Clients/Clients";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "Perfil",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/clients",
    name: "Clientes",
    icon: "pe-7s-users",
    component: Clients
  },
  {
    path: "/typography",
    name: "Vendedores",
    icon: "pe-7s-note2",
    component: Typography
  },
  { path: "/icons", name: "Vendas", icon: "pe-7s-cart", component: Icons },
  { path: "/maps", name: "Produtos", icon: "pe-7s-box1", component: Maps },
  {
    path: "/notifications",
    name: "Notificações",
    icon: "pe-7s-bell",
    component: Notifications
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
