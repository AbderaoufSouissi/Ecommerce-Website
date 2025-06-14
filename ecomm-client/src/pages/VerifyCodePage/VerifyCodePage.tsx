import { useCallback, useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoading } from "../../store/features/common"
import { verify } from "../../api/authentication"

interface VerificationCredentials {
  username: string
  code: string
}

const VerifyCodePage = ({ email }: { email: string }) => {
  const [values, setValues] = useState<VerificationCredentials>({
    username: email,
    code: ""
  })
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""])
  const [error, setError] = useState<string>("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [message,setMessage] = useState<string>("")

  useEffect(() => {
    const otpCode = code.join("")
    setValues(prev => ({ ...prev, code: otpCode }))
  }, [code])

 const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError("")
  setMessage("")

  const otpCode = code.join("")

  if (otpCode.length !== 6) {
    setError("Please enter all 6 digits")
    return
  }

  const payload = {
    username: email,
    code: otpCode
  }

  dispatch(setLoading(true))
  verify(payload)
    .then(res => {
      setError("")
      setMessage("Email verification successful.")

      // Wait 2 seconds before navigating to login
      setTimeout(() => {
        navigate("/v1/login") // or your actual login route
      }, 2000)
    })
    .catch(err => {
      setMessage("")
      console.log(payload)
      setError("Verification code incorrect or expired.")
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}, [code, email, dispatch, navigate])



 const handleOtpChange = useCallback((index: number, value: string) => {
  if (!/^\d?$/.test(value)) return;

  setCode(prev => {
    const newOtpDigits = [...prev];
    newOtpDigits[index] = value;

    // Move to next input if filled
    if (value && index < code.length - 1) {
  inputRefs.current[index + 1]?.focus();
}

    return newOtpDigits;
  });
 }, []);
  
  
  
  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }, [code])

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
  const digits = pastedData.split("");

  if (digits.length !== 6) {
    setError("Please paste a valid 6-digit code");
    return;
  }

  setCode(digits);

  // Wait for state update before verifying
  setTimeout(() => {
    const payload = {
      username: email,
      code: digits.join("")
    };

    dispatch(setLoading(true));
    setError("");
    setMessage("");

    verify(payload)
      .then(() => {
        setError("");
        setMessage("Email verification successful.");

        // Redirect after short delay
        
      })
      .catch(() => {
        setMessage("");
        setError("Verification code incorrect or expired.");
      })
      .finally(() => {
        dispatch(setLoading(false));
        setTimeout(() => {
          navigate("/v1/login");
        }, 2000);
      });
  }, 100);
}, [email, dispatch, navigate]);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setValues(values => ({ ...values, [e.target.name]: e.target.value }))
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="max-w-2xl text-center mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-black">
          Verify Your Account
        </h1>
        <p className="font-semibold text-base sm:text-lg md:text-xl lg:text-xl text-gray-800">
          To activate your account, check your email for the verification code and enter it below.
        </p>
        {email && (
          <p className="text-sm text-gray-800 font-medium mt-2">
            Code sent to: <span className="font-bold text-black">{email}</span>
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="space-y-6">
          <form onSubmit={onSubmit} className="flex justify-center space-x-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                autoComplete="off"
                required
              />
            ))}
          </form>

          {/* Hidden input to maintain compatibility with existing logic */}
          <input
            type="hidden"
            name="code"
            value={values.code}
            onChange={handleOnChange}
          />

          {/* Username field (if needed) */}
          <input
            type="hidden"
            name="username"
            value={values.username}
            onChange={handleOnChange}
          />

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}
          {message && !error && (
        <div className="text-green-600 text-sm text-center font-medium">
        {message}
        </div>
        )}

          {/* Submit button */}
          <button
            type="submit"
            onClick={e => onSubmit(e as any)}
            className="w-full bg-black border-1 rounded-md p-3 sm:p-4 my-2 font-semibold text-white text-center text-sm sm:text-base flex items-center justify-center cursor-pointer hover:text-black hover:bg-white duration-200"
          >
            Verify Code
          </button>
        </div>

        {/* Resend code option */}
        <div className="mt-6 text-center">
          <p className="text-gray-800 text-sm">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={()=> console.log("resending code")}
              className="font-semibold cursor-pointer underline underline-offset-4 transition-all duration-300 hover:text-blue-600 hover:scale-105 ml-1"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyCodePage