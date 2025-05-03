import { RegisterForm } from "@/components/RegisterForm/RegisterForm";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen h-full bg-gradient-to-br from-red-100 via-red-200 to-red-300">
      <RegisterForm />
    </div>
  );
}
