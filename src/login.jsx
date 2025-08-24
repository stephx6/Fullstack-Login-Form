import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //use state for showing password
  const [showPass, setShowPass] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tell backend JSON is coming
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful! Welcome " + data.username);
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center md:min-h-[75vh] text-[#F8F8F8]"
      >
        <div className="flex flex-col justify-center items-start  border-1 rounded-2xl p-28 bg-[#1E293B]">
          <div className="flex justify-center items-center w-full">
            <h1 className="md:text-[30px] font-['Poppins']">LOGIN</h1>
          </div>

          <span className="username-login flex flex-col justify-center items-start my-2">
            <label htmlFor="password">Phone or Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-1 bg-[#334155] text-[#94A3B8]"
            />
          </span>
          <span className="flex flex-col justify-center items-start my-2 relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-1 bg-[#334155]"
            />{" "}
            {/* Toggle icons based on showPass */}
            {showPass ? (
              <FaEye
                onClick={() => setShowPass(false)}
                className="absolute right-2 w-[18px] top-7 cursor-pointer hover:scale-110 transition duration-200 ease"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPass(true)}
                className="absolute right-2 w-[18px] top-7 cursor-pointer hover:scale-110 transition duration-200 ease"
              />
            )}
          </span>
          <span className="md:text-[12px] gap-0 flex flex-col justify-start items-start">
            <p>Dont have an account?</p>
            <a href="" className="text-[#FACC15]">
              REGISTER
            </a>
          </span>
          <div className="flex justify-center items-center w-full">
            <button type="submit" className="border-1 md:p-1 mt-5">
              LOGIN
            </button>
          </div>
          <p>{message}</p>
        </div>
      </form>
    </>
  );
}
