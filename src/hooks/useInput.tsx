import { useState } from "react";
import type { AddProductForm } from "~/components/Account/Store/Products/AddProductModal";

export const useInput = (
  initialValue: string | number,
  name: string,
  setHandler: React.Dispatch<React.SetStateAction<AddProductForm>>
) => {
  const [value, setValue] = useState<string | number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(e.target.value);

    if (name) {
      setHandler((prevState) => ({
        ...prevState,
        [name]: e.target.value,
      }));
    }
  };

  return { value, onChange: handleChange, name };
};
