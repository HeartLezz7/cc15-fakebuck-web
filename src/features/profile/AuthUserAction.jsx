import ActionButton from "./ActionButton";
import { PenIcon } from "../../icons";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function AuthUserAction() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <ActionButton onClick={() => setIsOpen(true)}>
        <PenIcon />
        <span className="font-semibold">Edit Profile</span>
      </ActionButton>
      <Modal
        open={isOpen}
        title="edit Profile"
        onClose={() => setIsOpen(false)}
        maxWidth={44}
      ></Modal>
    </div>
  );
}
