import React from "react";
import { Accounts } from "@/components/accounts";
import ChangePassword from "@/components/accounts/change-pass";

const Account = () => {
  return (
    <>
      <div className="p-5">
        <ChangePassword />
      </div>
    </>
  );
};

export default Account;
