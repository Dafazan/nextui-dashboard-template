import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { Community } from "../icons/community";
import { InfoIcon } from "../icons/accounts/info-icon";
import { logout } from "@/app/db/firebase";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="bg-white rounded-md p-2">
            <img src="/sld.png" alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Posts">
              <SidebarItem
                isActive={pathname === "/portofolio"}
                title="Portofolio"
                icon={<ProductsIcon />}
                href="portofolio"
              />
              <SidebarItem
                isActive={pathname === "/Blogs"}
                title="Blogs"
                icon={<ReportsIcon />}
                href="Blogs"
              />
            </SidebarMenu>
            <SidebarMenu title="Images">
              <SidebarItem
                isActive={pathname === "/clients"}
                title="clients"
                icon={<CustomersIcon />}
                href="clients"
              />
              <SidebarItem
                isActive={pathname === "/partner"}
                title="partners"
                icon={<CustomersIcon />}
                href="partner"
              />
            </SidebarMenu>

            <SidebarMenu title="Pages">
              <SidebarItem
                isActive={pathname === "/account"}
                title="Account"
                icon={<AccountsIcon />}
                href="account"
              />
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Register Account"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <button
                className="w-full py-2 bg-red-500 rounded-xl"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            {/* <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip> */}
          </div>
        </div>
      </div>
    </aside>
  );
};
