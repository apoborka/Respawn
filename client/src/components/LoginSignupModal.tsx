import React, { useState } from "react";

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // State to toggle between login and create account modals
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    console.log("Account created successfully!");
    onClose(); // Close the modal after successful submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {isCreatingAccount ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleCreateAccountSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={password !== confirmPassword} // Disable button if passwords don't match
                className={`mt-4 w-full py-2 rounded-md ${
                  password !== confirmPassword
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Create Account
              </button>
            </form>
            <button
              onClick={() => setIsCreatingAccount(false)}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setIsCreatingAccount(true)}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Create Account
            </button>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignupModal;