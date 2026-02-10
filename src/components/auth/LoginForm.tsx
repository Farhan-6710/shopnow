"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authContext";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "@/config/ToastConfig";
import { motion } from "framer-motion";

interface LoginFormProps {
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const LoginForm = ({
  setShowLoginModal,
  setShowSignupModal,
}: LoginFormProps) => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
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
      setShowLoginModal(false);
    } catch {
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
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await signInWithEmail(email, password);
      showToast({
        type: "success",
        title: "Successfully Signed In",
        description: "Welcome back!",
      });
      setShowLoginModal(false);
    } catch {
      showToast({
        type: "error",
        title: "Sign In Failed",
        description:
          "Unable to sign in. Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <motion.form
        onSubmit={handleSubmit}
        aria-label="Login form"
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
            <label htmlFor="login-username" className="sr-only">
              Username
            </label>
            <input
              ref={inputRef}
              type="text"
              id="login-username"
              name="username"
              placeholder="Username (optional)"
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
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              placeholder="Email"
              required
              autoComplete="email"
              className="w-full px-4 py-2 border rounded-md transition duration-300 focus:outline-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
            className="block"
          >
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                name="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 pr-10 border rounded-md transition duration-300 focus:outline-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground"
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
            {loading ? "Signing in..." : "Continue"}
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
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            className="text-primary hover:underline font-medium"
          >
            Sign Up
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
          By signing in, you agree to our Terms and Policy.
        </motion.p>
      </motion.form>
    </div>
  );
};

export default LoginForm;
