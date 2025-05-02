import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import Auth from '../utils/auth'

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // State to toggle between login and create account modals
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [createUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);


  const handleCreateAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password.length < 8) {
      setError("Password is too short");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const userCreateData = {username,password}
    try {
      const {data} = await createUser({
        variables: {...userCreateData}
      });
      Auth.login(data.addUser.token)
      setError("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      console.log("Account created successfully!");
      onClose(); // Close the modal after successful submission
    }
    catch(err){
      setError("Error Creating Account")
      return;
    }

  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userLoginData = {username, password}
    try{
      const {data} = await loginUser({
        variables: {...userLoginData}
      });
      Auth.login(data.login.token);
      setError("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    }
    catch(err) {
      setError("Error Logging In");
      return;
    }
  }

  const isCreateAccountEnabled = username && password && confirmPassword;
  const isLoginEnabled = username && password;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {isCreatingAccount ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
            <form onSubmit={handleCreateAccountSubmit} className="flex flex-col items-center">
              <div className="mb-4 w-full">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full mt-1 p-2 border rounded-md" /* Matches Password field styling */
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex flex-col items-center w-full">
                <button
                  type="submit"
                  disabled={!isCreateAccountEnabled} // Disable button if fields are not valid
                  className={`modal-button ${
                    isCreateAccountEnabled ? "hover:border-green-500" : "cursor-not-allowed"
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => setIsCreatingAccount(false)}
                  className="modal-button"
                >
                  Back to Login
                </button>
                <button
                  onClick={onClose}
                  className="modal-button close-button"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit} className="flex flex-col items-center">
              <div className="mb-4 w-full">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex flex-col items-center w-full">
                <button
                  type="submit"
                  disabled={!isLoginEnabled} // Disable button if fields are not valid
                  className={`modal-button ${
                    isLoginEnabled ? "hover:border-green-500" : "cursor-not-allowed"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsCreatingAccount(true)}
                  className="modal-button"
                >
                  Create Account
                </button>
                <button
                  onClick={onClose}
                  className="modal-button close-button"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignupModal;