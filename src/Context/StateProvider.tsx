import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export type StateContextType = {
  isDropDown: any;
  setDropDown: (dropdown: any) => void;
  isRefetch: any;
  setIsRefetch: (refetch: any) => void;
  isLoading: any;
  setIsLoading: (loading: any) => void;
  OpenCart: any;
  setOpenCart: (opencart: any) => void;
  isSelected: any;
  setSelected: (selected: any) => void;
};

export const StateContext = createContext<StateContextType>({
  isDropDown: "",
  setDropDown: () => {},
  isRefetch: "",
  setIsRefetch: () => {},
  isLoading: [],
  setIsLoading: () => {},
  OpenCart: [],
  setOpenCart: () => {},
  isSelected: 0,
  setSelected: () => {},
});

export const StateProvider = ({ children }: Props) => {
  const [isDropDown, setDropDown] = useState("");
  const [isRefetch, setIsRefetch] = useState("");
  const [isSelected, setSelected] = useState(0);
  //custom
  const [isLoading, setIsLoading] = useState(false);
  const [OpenCart, setOpenCart] = useState(false);

  return (
    <StateContext.Provider
      value={{
        isSelected,
        setSelected,
        isDropDown,
        setDropDown,
        isRefetch,
        setIsRefetch,
        isLoading,
        setIsLoading,
        OpenCart,
        setOpenCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
