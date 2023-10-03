import { useState } from "react";
import Modal from "../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        className="bg-green-500 text-white rounded-md px-2.5 py-2.5 font-bold hover:bg-green-600"
        onClick={() => setIsOpen(true)}
      >
        Create account
      </button>
      <Modal title="Sign up" open={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterForm />
      </Modal>
    </div>
  );
}
