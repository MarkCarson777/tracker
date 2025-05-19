// Components
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
// Firebase
import { signUp } from "../../services/authService";
// Forms
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Routing
import { Link, useNavigate } from "react-router-dom";
// Types
import { signUpSchema, type SignUp } from "../../schemas/authSchema";
// Utilities
import { cn } from "../../utils/cn";

interface Props {
  className?: string;
}

const SignUpForm: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  // Form setup
  const formMethods = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Destructure form methods
  const { handleSubmit, formState } = formMethods;

  const onSubmit = async (data: SignUp) => {
    try {
      const user = await signUp(data.email, data.password);
      console.log("User created:", user);

      navigate("/log-workout");
    } catch (error) {
      console.error("Sign-up error", error);
    }
  };

  console.log("Form state:", formState.errors);
  // TODO: display passwords don't match error
  // TODO: display email already in use error
  // TODO: separate concerns of firebase errors and form validation errors

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
          placeholder="Enter a new password..."
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          placeholder="Confirm your password..."
        />
        <Button variant="primary">
          {formState.isSubmitting ? "Signing up..." : "Sign up"}
        </Button>
      </form>
      <div className="flex">
        <span>Already have an account?</span>
        <Link to="/sign-in">Sign in</Link>
      </div>
    </FormProvider>
  );
};

export { SignUpForm };
