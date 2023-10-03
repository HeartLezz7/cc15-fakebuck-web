import { useRef } from "react";
import FormButton from "./FormButton";
import { useState } from "react";

export default function PictureForm({ title, children }) {
  const [file, setFile] = useState(null);
  const inputEl = useRef(null);

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputEl}
        onChange={(e) => {
          if (e.target.files[0]) {
            setFile(e.target.files[0]);
            console.log(e.target.files);
          }
        }}
      />
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold">{title}</h5>
        <div>
          {file && (
            <>
              <FormButton>save</FormButton>
              <FormButton
                onClick={() => {
                  inputEl.current.value = "";
                  setFile(null);
                }}
              >
                cancel
              </FormButton>
            </>
          )}

          <FormButton
            onClick={() => {
              inputEl.current.click();
            }}
          >
            edit
          </FormButton>
        </div>
      </div>
      <div className="flex justify-center">
        {children(file ? URL.createObjectURL(file) : null)}
      </div>
    </div>
  );
}
