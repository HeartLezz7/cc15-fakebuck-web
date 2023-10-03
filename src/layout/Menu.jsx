import { useLocation } from "react-router-dom";
import { HouseIcon, UserGroupIcon } from "../icons";
import MenuItem from "./MenuItem";

const menus = [
  { id: 1, to: "/", Icon: HouseIcon },
  { id: 2, to: "/friend", Icon: UserGroupIcon },
];

export default function Menu() {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-center items-center gap-2">
      {menus.map((item) => (
        <MenuItem
          key={item.id}
          to={item.to}
          Icon={item.Icon}
          active={pathname == item.to}
        />
      ))}
    </nav>
  );
}
