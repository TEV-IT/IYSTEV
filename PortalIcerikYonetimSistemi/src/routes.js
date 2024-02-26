// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignUp from "layouts/index";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

const routes = [
  {
    type: "route",
    name: "Kategoriler",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Tables />,
  },
  
  // {
  //   type: "route",
  //   name: "Etkinlik Takvimi",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58"  />,
  //   component: <VirtualReality />,
  // },
  // {

  
  {
    type: "route",
    name: "İçerik Düzenleme",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
    component: <Profile />,
  },
  {
    type: "route",
    name: "Giriş Yap",
    key: "sign-up",
    route: "/sign-up",
    icon: <ArgonBox component="i" color="dark" fontSize="14px"  className="ni ni-single-02" />,
    component: <SignUp />,
  },

];

export default routes;
