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
import { PanToolSharp } from "@mui/icons-material";
import { MenuList } from "@mui/material";
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";

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
                isActive={pathname === "/blogs"}
                title="Info & News"
                icon={<ReportsIcon />}
                href="/blogs"
              />
              <SidebarItem
                isActive={
                  pathname === "/portofolio" || pathname === "/portofolio/new"
                }
                title="Portofolio"
                icon={<ProductsIcon />}
                href="/portofolio"
              />
            </SidebarMenu>
            <SidebarMenu title="Tools">
              <SidebarItem
                isActive={pathname === "/qrgenerate"}
                title="QR Generator"
                icon={<ViewIcon />}
                href="/qrgenerate"
              />
              <SidebarItem
                isActive={pathname === "/urlgenerate"}
                title="URL Generator"
                icon={<DevIcon />}
                href="/urlgenerate"
              />
            </SidebarMenu>
            <SidebarMenu title="Site Settings">
              <SidebarItem
                isActive={pathname === "/clients"}
                title="Clients"
                icon={<CustomersIcon />}
                href="/clients"
              />
              <SidebarItem
                isActive={pathname === "/partner"}
                title="Partners"
                icon={<CustomersIcon />}
                href="/partner"
              />
              <SidebarItem
                isActive={pathname === "/images"}
                title="Images"
                icon={<BalanceIcon />}
                href="/images"
              />
              <SidebarItem
                isActive={pathname === "/texts"}
                title="Paragraph & Titles"
                icon={<SettingsIcon />}
                href="/texts"
              />
            </SidebarMenu>

            <SidebarMenu title="Account Settings">
              <SidebarItem
                isActive={pathname === "/account"}
                title="My Account"
                icon={<AccountsIcon />}
                href="/account"
              />
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Register Account"
                icon={<AccountsIcon />}
                href="/accounts"
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
