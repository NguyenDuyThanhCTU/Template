import React, { ChangeEvent } from "react";

interface InputProps {
  text: string;
  Value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ text, Value, setValue }) => {
  return (
    <div>
      <div className="my-4">
        <label className="block text-gray-700 text-sm font-bold mb-4">
          {text}
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={Value}
          placeholder={`Nhập ${text}`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        ></textarea>
      </div>
    </div>
  );
};

export default Input;
