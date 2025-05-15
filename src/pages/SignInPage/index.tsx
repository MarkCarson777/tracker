// Components
import { SignInForm } from "../../components/SignInForm";
// Containers
import { PageContainer } from "../../containers/PageContainer";

const SignInPage: React.FC = () => {
  return (
    <PageContainer>
      <SignInForm />
    </PageContainer>
  );
};

export { SignInPage };
