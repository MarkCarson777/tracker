// Components
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
// Firebase
import { signIn } from "../../services/authService";
// Forms
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Routing
import { useNavigate } from "react-router-dom";
// Types
import { signInSchema, type SignIn } from "../../schemas/authSchema";

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

  const onSubmit = async (data: SignIn) => {
    try {
      const user = await signIn(data.email, data.password);
      console.log("User signed in:", user);
      navigate("/logWorkout");
    } catch (error) {
      console.error("Sign-in error in component:", error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <FormInput id="email" name="email" type="text" />
        <FormInput id="password" name="password" type="text" />
        <Button>{formState.isSubmitting ? "Loading..." : "Sign In"}</Button>
      </form>
    </FormProvider>
  );
};

export { SignInForm };
