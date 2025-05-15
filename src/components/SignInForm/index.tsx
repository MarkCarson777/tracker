// Components
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
// Firebase
import { signIn } from "../../services/authService";
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
    },
  });

  // Destructure form methods
  const { handleSubmit, formState } = formMethods;

  // Handle form submission
  const onSubmit = async (data: SignIn) => {
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
      <form className={cn(className)} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email..."
        />
        <FormInput
          id="password"
          name="password"
          type="text"
          placeholder="Enter your password..."
        />
        <Button>{formState.isSubmitting ? "Signing in..." : "Sign in"}</Button>
      </form>
      <div className="flex">
        <span>Don't have an account?</span>
        <Link to="/sign-up">Create one</Link>
      </div>
    </FormProvider>
  );
};

export { SignInForm };
