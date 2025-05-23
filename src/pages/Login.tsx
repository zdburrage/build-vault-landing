import { useAuth } from '@workos-inc/authkit-react';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { signIn } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <Button
          className="w-full"
          onClick={() => signIn()}
        >
          Sign in with WorkOS
        </Button>
      </div>
    </div>
  );
};

export default Login;
