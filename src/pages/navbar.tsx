import { useContext } from "react";
import UserContext from "../context/UserContext";
import { ITokenProps } from "../types";
import { FALL_BACK_DP } from "../utils/constants";

const Navbar = () => {
  const { state, setState } = useContext(UserContext);
  return (
    <div className="flex flex-row justify-end  items-center p-3 fixed top-0 w-full bg-white border-bottom-blue drop-shadow-sm">
      <button
        className="rounded bg-white border border-blue-500	text-blue-500 hover:text-white hover:bg-blue-500 py-2 px-4 mr-1 text-sm text-white"
        onClick={() => setState.setUser(null)}
      >
        Logout
      </button>
      <img
        src={state.profile || FALL_BACK_DP}
        width={32}
        height={32}
        alt="user image"
        className="rounded-full aspect-square object-cover peer"
      />
      <span className="absolute hidden -bottom-4 bg-black text-white px-1 rounded peer-hover:block transition-all">{state.email}</span>
    </div>
  );
};

export default Navbar;
