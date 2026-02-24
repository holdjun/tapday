import { LoginForm } from "@/components/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="bg-background flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-center text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-muted text-muted-foreground rounded-md p-3 text-center text-sm">
            {message}
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
