"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authContext";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "@/config/ToastConfig";
import { motion } from "framer-motion";

interface SignUpFormProps {
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  setShowLoginModal,
  setShowSignupModal,
}) => {
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      setShowSignupModal(false);
    } catch (error: unknown) {
      showToast({
        type: "error",
        title: "Google Sign-In Failed",
        description:
          "Unable to sign in with Google. Please check your network connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const fullName = formData.get("new-username") as string;
      const email = formData.get("new-email") as string;
      const password = formData.get("new-password") as string;
      const confirmPassword = formData.get("confirm-password") as string;

      if (password !== confirmPassword) {
        showToast({
          type: "error",
          title: "Password Mismatch",
          description: "The passwords you entered do not match.",
        });
        return;
      }

      await signUpWithEmail(email, password, fullName);

      showToast({
        type: "success",
        title: "Account Created",
        description: "Please check your email to verify.",
      });

      setShowSignupModal(false);
    } catch (error: unknown) {
      showToast({
        type: "error",
        title: "Sign Up Failed",
        description:
          "Unable to create account. Please check your information and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <motion.form
        onSubmit={handleSubmit}
        aria-label="Sign up form"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <div className="space-y-4 mb-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
          >
            <label htmlFor="signup-username" className="sr-only">
              Username
            </label>
            <input
              ref={inputRef}
              type="text"
              id="signup-username"
              name="new-username"
              placeholder="Username"
              required
              autoComplete="username"
              className="w-full px-4 py-2 border rounded-md transition duration-300 focus:outline-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
          >
            <label htmlFor="signup-email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="new-email"
              placeholder="Email"
              required
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
          >
            <label htmlFor="signup-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="signup-password"
                name="new-password"
                placeholder="Password"
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 pr-10 border rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
          >
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
                className="w-full px-4 py-2 pr-10 border rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <Button type="submit" disabled={loading} className="w-full mb-4 h-10">
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm font-semibold text-muted-foreground">
            OR
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 mb-4"
          >
            <i className="fab fa-google" aria-hidden="true" />
            <span>Continue with Google</span>
          </Button>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
          className="text-center text-sm text-muted-foreground mb-4"
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            className="text-primary hover:underline font-medium"
          >
            Login
          </button>
        </motion.p>

        <motion.hr
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
          className="my-4"
        />

        <motion.p
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
          className="text-xs text-muted-foreground text-center"
        >
          By signing up, you agree to our Terms and Policy.
        </motion.p>
      </motion.form>
    </div>
  );
};

export default SignUpForm;
