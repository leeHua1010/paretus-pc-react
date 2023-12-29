import { Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "~/store/app";
import { Button, Dropdown } from "antd";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import storage from "~/utils/storage";
import { getAvatarSrc } from "~/utils/utils";

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
      label: <a onClick={goProfile}>Profile</a>,
      icon: <IconUserCircle size={20} />,
    },
    {
      key: "2",
      label: <a onClick={handleLogout}>Louout</a>,
      icon: <IconLogout size={20} />,
    },
  ];

  return (
    <div className="h-screen bg-light-400 box-border">
      <div className="bg-white h-14 shadow-sm px-24 fcb box-border <sm:px-3">
        <div className="cursor-pointer fcc" onClick={goHome}>
          <i className="text-3xl text-[#4945ff] i-tabler-aperture hover:animate-spin"></i>
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
            <div className="cursor-pointer flex mr-6 items-center" onClick={goCreateArticle}>
              <i className="text-lg i-tabler-edit"></i>
              <div className="text-sm pl-1">Write</div>
            </div>
            <div className="cursor-pointer flex items-center">
              <Dropdown menu={{ items }}>
                {getAvatarSrc() ? (
                  <img className="rounded-1/2 w-8.5 h8.5" src={getAvatarSrc()} alt="avatar" />
                ) : (
                  <div className="flex bg-[#6a69ff] rounded-1/2 text-white text-sm w-8.5 items-center justify-center h8.5">
                    {appStore.userInfo?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </Dropdown>
            </div>
          </div>
        )}
      </div>
      <div
        id="layout"
        className="h-[calc(100vh-56px)] min-w-188 px-24 pt-4 overflow-y-scroll box-border <sm:px-3"
      >
        <Outlet />
      </div>
    </div>
  );
}
