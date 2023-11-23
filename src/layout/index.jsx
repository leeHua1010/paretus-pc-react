import { Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "~/store/app";
import { Button, Dropdown } from "antd";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import storage from "~/utils/storage";

export default function Layout() {
  const navigate = useNavigate();
  const appStore = useAppStore((state) => state);

  const goHome = () => navigate("/");

  const goLogin = () => navigate("/auth/login");

  const goSignup = () => navigate("/auth/register");

  const goCreateArticle = () => navigate("/article/create");

  const handleLogout = () => {
    storage.setUserInfo(null);
    storage.setToken("");
    appStore.setUserInfo(null);
    goHome();
  };

  const goProfile = () => navigate("/profile/info");

  const items = [
    {
      key: "1",
      label: <span onClick={goProfile}>Profile</span>,
      icon: <IconUserCircle size={20} />,
    },
    {
      key: "2",
      label: <span onClick={handleLogout}>Louout</span>,
      icon: <IconLogout size={20} />,
    },
  ];

  return (
    <div className="box-border h-screen bg-light-400">
      <div className="bg-white h-14 fcb box-border shadow-sm px-24 <sm:px-3">
        <div className="fcc cursor-pointer" onClick={goHome}>
          <i className="text-3xl text-[#4945ff] i-tabler-aperture"></i>
          <div className="text-xl pl-2">Paretus</div>
        </div>
        {!appStore.userInfo ? (
          <div className="fcc">
            <div className="mr-4">
              <Button type="primary" shape="round" onClick={goLogin}>
                Login
              </Button>
            </div>
            <Button type="primary" shape="round" ghost onClick={goSignup}>
              Sign up
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center mr-6 cursor-pointer" onClick={goCreateArticle}>
              <i className="i-tabler-edit text-lg"></i>
              <div className="pl-1 text-sm">Write</div>
            </div>
            <div className="flex items-center cursor-pointer">
              <Dropdown menu={{ items }}>
                <div className="bg-[#6a69ff] flex items-center justify-center w-8.5 h8.5 text-white rounded-1/2 text-sm">
                  {appStore.userInfo?.username?.charAt(0).toUpperCase()}
                </div>
              </Dropdown>
            </div>
          </div>
        )}
      </div>
      <div
        id="layout"
        className="px-24 pt-4 h-[calc(100vh-56px)] overflow-y-scroll box-border <sm:px-3"
      >
        <Outlet />
      </div>
    </div>
  );
}
