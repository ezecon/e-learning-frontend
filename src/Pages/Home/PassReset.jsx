import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input, Button } from "@material-tailwind/react";
import { useToken } from "../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api"; // change if needed

export default function PasswordResetWithOTP() {
  const [step, setStep] = useState(2); // 1 = request OTP, 2 = verify+reset
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
  });

  const inputsRef = useRef([]);const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [student, setUserInfo] = useState(null);

  // Verify token and set user ID
useEffect(() => {
  const verifyToken = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        'http://localhost:8000/api/token-verify',
        {}, 
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200 ) {
        setUserID(response.data.student_id);
        console.log(response.data.student_id);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  if (token) {
    verifyToken();
  }
}, [token]);


  // Fetch user info when userID changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8000/api/students/search/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data);
            console.log(response.data);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [userID]);


  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleResetPassword = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter the 6-digit OTP.");
      return;
    }
    if (passwords.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (passwords.password !== passwords.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // 1) verify OTP
      const verify = await axios.post(`${API}/verify-otp-and-reset-password`, {
        student_id: student.student_id,
        otp: code,
        password: passwords.password,
      });
      if (verify.status !== 200) {
        toast.error("Invalid or expired OTP.");
        setLoading(false);
        return;
      }

      toast.success("Password reset successfully. You can log in now.");
     navigate("/profile");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        Object.values(err?.response?.data?.errors || {}).flat().join("\n") ||
        "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-pink-100 to-amber-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 bg-gradient-to-r from-green-600 to-white text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Reset Password</h1>
          <p className="opacity-90 mt-1">
            {step === 1 ? "Enter your Student ID to receive an OTP" : "Enter OTP and set your new password"}
          </p>
        </div>

        <div className="p-8 space-y-6">

          {/* Step 2: Verify + Reset */}
          {step === 2 && (
            <div className="space-y-6">

              {/* OTP Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-digit OTP</label>
                <div className="flex gap-2 justify-center">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputsRef.current[i] = el)}
                      value={d}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                    />
                  ))}
                </div>
                
              </div>

              {/* New Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  crossOrigin
                  type="password"
                  label="New Password (min 6 chars)"
                  value={passwords.password}
                  onChange={(e) => setPasswords((p) => ({ ...p, password: e.target.value }))}
                />
                <Input
                  crossOrigin
                  type="password"
                  label="Confirm Password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                />
              </div>

              <Button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 rounded-xl shadow-md"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="text-center text-sm text-gray-500">
                Tip: Your default password used to be <code>#econ</code>. After resetting, use your new one.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
