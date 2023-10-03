import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icons";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/use-auth";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownEl = useRef(null); // dropDownEl = { current:null }
  console.log("after use ref", dropDownEl);

  const { logout, authUser } = useAuth();
  console.log(authUser);

  useEffect(() => {
    console.log("after use ref", dropDownEl);
    const handleClickOutside = (e) => {
      console.log(e.target);
      if (!dropDownEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropDownEl}>
      <div id="a" className="" onClick={() => setIsOpen(!isOpen)}>
        <Avatar />
      </div>
      {isOpen && (
        <div className=" w-96 absolute bg-white right-0 translate-y-1 border rounded-xl shadow-xl p-2 ">
          <Link to="/profile/aaaaa">
            <div className=" flex gap-4 p-2 items-center rounded-xl hover:bg-gray-200">
              <Avatar className="h-14" />
              <div>
                <div className="font-semibold">
                  {authUser.firstName} {authUser.lastName}
                </div>
                <div className="text-sm text-gray-500">See your profile</div>
              </div>
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-200 rounded-xl"
            onClick={logout}
          >
            <div className="bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center">
              <RightFromBracketIcon />
            </div>
            <div className="font-semibold ">Log out</div>
          </div>
        </div>
      )}
    </div>
  );
}