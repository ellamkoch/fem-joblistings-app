//Header
//This file wraps around the theme selector and the hero background
import HeroBackground from "@components/shared/HeroBackground.component";
import ThemeSelect from "@components/shared/ThemeSelect.component";

function Header() {
    return (
        <div className="header flex">
            <HeroBackground />
            <ThemeSelect />
        </div>
    );
}
export default Header;
