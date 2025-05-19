// Components
import { Button } from "../../components/Button";
import { Checkbox } from "../Checkbox";
import { FormInput } from "../../components/FormInput";
import { Icon } from "../Icon";
// Firebase
import { signIn, signInWithGoogle } from "../../services/authService";
import { auth } from "../../firebase";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
// Forms
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Types
import { signInSchema, type SignIn } from "../../schemas/authSchema";
// Utilities
import { cn } from "../../utils/cn";

interface Props {
  className?: string;
}

const SignInForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  // Form setup
  const formMethods = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Destructure form methods
  const { handleSubmit, formState } = formMethods;

  // Handle form submission
  const onSubmit = async (data: SignIn) => {
    const rememberUser = data.rememberMe || false;

    if (rememberUser) {
      await setPersistence(auth, browserLocalPersistence);
      console.log("Session persistence set to LOCAL");
    } else {
      await setPersistence(auth, browserSessionPersistence);
      console.log("Session persistence set to SESSION");
    }

    try {
      const user = await signIn(data.email, data.password);
      console.log("User signed in:", user);

      navigate("/");
    } catch (error) {
      console.error("Sign-in error in component:", error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={cn(
          "bg-[#E6FEAD] py-10 px-6 rounded-3xl min-w-[560px] min-h-[640px] drop-shadow-2xl flex flex-col items-center space-y-2",
          className
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src="src/assets/logo.svg" alt="Logo" className="mb-4" />
        <span className="font-semibold w-full">Sign in to continue</span>
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder="Email address"
        />
        <FormInput
          id="password"
          name="password"
          type="text"
          placeholder="Password"
        />
        <Button variant="primary">
          {formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
        <div className="flex w-full items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Checkbox name="rememberMe" />
            <span>Remember me</span>
          </div>
          <Link className="font-semibold hover:underline" to="/sign-up">
            Forgot password?
          </Link>
        </div>
        <div className="flex w-full space-x-2">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle()
                .then((user) => {
                  console.log("User signed in with Google:", user);
                  navigate("/");
                })
                .catch((error) => {
                  console.error("Google Sign-in error:", error);
                });
            }}
          >
            <Icon icon="Google" size={20} />
            <span>Google</span>
          </Button>
          <Button variant="secondary">
            <Icon icon="Facebook" size={20} />
            <span>Facebook</span>
          </Button>
        </div>
        <div className="flex space-x-1 mt-auto">
          <span>Don't have an account?</span>
          <Link className="font-semibold hover:underline" to="/sign-up">
            Register
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignInForm };
