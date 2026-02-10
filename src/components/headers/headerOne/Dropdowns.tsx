import AccountDropdown from "./AccountDropdown";
import CurrencyDropdown from "./CurrencyDropdown";

const Dropdowns = () => {
  return (
    <div className="flex gap-2">
      <CurrencyDropdown />
      <AccountDropdown />
    </div>
  );
};

export default Dropdowns;
