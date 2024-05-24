"use client";
import { useState, FormEvent } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { TextField, Container, Typography, Box } from "@mui/material";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setSuccess("Password updated successfully.");
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  return (
    <>
      <div className="bg-white p-5 rounded-md">
        <form className="rounded-sm" onSubmit={handleChangePassword}>
          <div className="flex flex-col gap-5">
            <p className="text-[#333333] font-bold text-xl">Change Password</p>
            <TextField
              id="outlined-basic"
              label="Current Password"
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              id="outlined-password-input"
              type="password"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              id="outlined-password-input"
              type="password"
              label="Confirm New Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />
          </div>

          <button
            className="bg-blue-500 w-full rounded-sm py-3 mt-5"
            type="submit"
          >
            Change Password
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
