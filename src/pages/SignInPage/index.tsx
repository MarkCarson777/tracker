// Components
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
// Forms
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Types
import { signInSchema, type SignIn } from "../../schemas/authSchema";

const SignInPage: React.FC = () => {
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

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FormInput id="email" name="email" type="text" />
        <FormInput id="password" name="password" type="text" />
        <Button>{formState.isSubmitting ? "Loading..." : "Sign In"}</Button>
      </form>
    </FormProvider>
  );
};

export { SignInPage };
