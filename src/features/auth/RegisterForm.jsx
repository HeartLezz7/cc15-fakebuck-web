import { useState } from "react";
import { toast } from "react-toastify";
import RegisterInput from "./RegisterInput";
import Joi from "joi";
import InputErrorMessage from "./InputErrorMessage";
import { useAuth } from "../../hooks/use-auth";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const { register } = useAuth();

  const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    emailOrMobile: Joi.alternatives([
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/),
    ]).required(),
    password: Joi.string()
      .pattern(/^[a-zA-z0-9]{6,30}$/)
      .trim()
      .required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .trim()
      .required()
      .strip(),
  });

  const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });
    if (error) {
      const result = error.details.reduce((acc, item) => {
        const { message, path } = item;
        acc[path[0]] = message;
        return acc;
      }, {});
      return result;
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validationError = validateRegister(input);
    console.log(validationError);
    if (validationError) {
      return setError(validationError);
    }
    setError({});
    register(input).catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <form
      className="grid grid-cols-2 gap-x-3 gap-y-4"
      onSubmit={handleSubmitForm}
    >
      <div>
        <RegisterInput
          placeholder="First name"
          name="firstName"
          value={input.firstName}
          onChange={handleChangeInput}
          hasError={error.firstName}
        />
        {error.firstName && <InputErrorMessage message={error.firstName} />}
      </div>
      <div>
        <RegisterInput
          placeholder="Last name"
          name="lastName"
          value={input.lastName}
          onChange={handleChangeInput}
          hasError={error.lastName}
        />
        {error.lastName && <InputErrorMessage message={error.lastName} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Email address or mobile number"
          name="emailOrMobile"
          value={input.emailOrMobile}
          onChange={handleChangeInput}
          hasError={error.emailOrMobile}
        />
        {error.emailOrMobile && (
          <InputErrorMessage message={error.emailOrMobile} />
        )}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Password"
          type="password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
          hasError={error.password}
        />
        {error.password && <InputErrorMessage message={error.password} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleChangeInput}
          hasError={error.confirmPassword}
        />
        {error.confirmPassword && (
          <InputErrorMessage message={error.confirmPassword} />
        )}
      </div>
      <div className="mx-auto col-span-full">
        <button className="bg-green-500 text-white rounded-lg px-2.5 py-2.5 font-bold hover:bg-green-600 text-lg min-w-[10rem] ">
          Sign up
        </button>
      </div>
    </form>
  );
}
