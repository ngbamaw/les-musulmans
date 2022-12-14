import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

import { useUser } from "@components/account/UserProvider";
import { routes } from "@components/router";

interface Props {
    open: boolean;
    onClose: () => void;
}

const Menu: React.FC<Props> = ({ open, onClose }) => {
  const factor = open ? 0 : 1;

  return (
    <nav
      style={{ transform: `translateX(${-100 * factor}%)` }}
      className="fixed top-0 left-0 z-30 h-screen p-4 w-fit bg-white transition-transform duration-200"
    >
      <ul>
        <li>
          <button onClick={() => onClose()}>
            <Icon icon="mdi:close" />
          </button>
        </li>
        <li>
          <Link to={routes.dashboard} className="flex items-center gap-2">
            <Icon icon="mdi:home" />
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/account/donation" className="flex items-center gap-2">
            <Icon icon="mdi:attach-money" />
            Liste des dons
          </Link>
        </li>
        <li>
          <Link to={routes.profile} className="flex items-center gap-2">
            <Icon icon="mdi:settings" />
            Paramètres
          </Link>
        </li>
        <li>
          <Link to={routes.logout} className="flex items-center gap-2">
            <Icon icon="mdi:logout" />
            Déconnexion
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const LayoutAccount = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useUser();

  return (
    <main className="bg-yellow-100 min-h-screen overflow-x-auto">
      <Menu open={open} onClose={() => setOpen(false)} />
      <header className="flex w-full p-4 justify-between">
        <button className="bg-transparent" onClick={() => setOpen(true)}>
          <Icon icon="mdi:menu" fontSize={24} />
        </button>
        <div className="flex items-center gap-2">
          <p>Bonjour, {user?.firstname}</p>
          <img
            src="https://avatars.githubusercontent.com/u/16801528?v=4"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>
      <Outlet />
    </main>
  );
};

export default LayoutAccount;
