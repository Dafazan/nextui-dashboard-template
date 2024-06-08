import React from "react";
import { Accounts } from "@/components/accounts";
import ChangePassword from "@/components/accounts/change-pass";
import MyProfile from "@/components/accounts/Profile";

const Account = () => {
  return (
    <>
      <div className="p-5 flex flex-col gap-3">
        <MyProfile />
        <ChangePassword />
      </div>
    </>
  );
};

export default Account;
