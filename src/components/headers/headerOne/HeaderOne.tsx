import AddressSection from "./AddressSection";
import Marquee from "./Marquee";
import Dropdowns from "./Dropdowns";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";

const HeaderOne = () => {
  return (
    <header className="transition-colors duration-200" role="banner">
      <div
        className="container mx-auto flex justify-center md:justify-between lg:justify-between items-center gap-0 md:gap-6 p-2 lg:px-16"
        aria-label="Main navigation"
      >
        <AddressSection />
        <Marquee />
        <Dropdowns /> {/* Dropdowns already uses currency from Redux */}
        <div className="flex md:hidden items-center gap-3 mt-1 pl-4">
          <div className="relative">
            <WishlistIcon />
          </div>
          <div className="relative">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
