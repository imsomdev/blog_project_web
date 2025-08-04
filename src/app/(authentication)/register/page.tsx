import RegisterForm from "./registerForm/RegisterForm";

const Register: React.FC = () => {
  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4">
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
