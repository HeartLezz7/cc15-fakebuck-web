import { useState } from "react";
import { toast } from "react-toastify";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-auth";

export default function LoginForm() {
  const [input, setInput] = useState({
    emailOrMobile: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(input).catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <LoginInput
          placeholder="Email address or phone number"
          value={input.emailOrMobile}
          onChange={(e) =>
            setInput({ ...input, emailOrMobile: e.target.value })
          }
        />
      </div>
      <div>
        <LoginInput
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
      </div>
      <div>
        <LoginButton />
      </div>
    </form>
  );
}
