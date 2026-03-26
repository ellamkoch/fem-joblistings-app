//Header
//This file wraps around the theme selector and the hero background
import HeroBackground from "@components/shared/HeroBackground.component";
import ThemeSelect from "@components/shared/ThemeSelect.component";

function Header() {
  return (
    <header className="header relative flex">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl justify-end px-4 pt-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto">
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
export default Header;
