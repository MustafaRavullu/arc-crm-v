import Avatar from "./Avatar";
import AvatarMenu from "./AvatarMenu";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import ThemeButton from "./ThemeButton";

export default function Header({ children }) {
  return (
    <div className="w-full z-[51] sticky top-0 bg-white h-16 shadow-md flex items-center justify-between px-6 dark:bg-arc_black">
      <Logo />
      <div className="flex items-center gap-5">
        <ThemeButton />
        {children}
        <Dropdown buttonContent={<Avatar />}>
          <AvatarMenu />
        </Dropdown>
      </div>
    </div>
  );
}
