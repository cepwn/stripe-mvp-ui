import React, { useState, FC, ReactElement, createContext } from 'react';

type LoaderContextObj = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const LoaderContext = createContext<LoaderContextObj>({
  isLoading: false,
  setIsLoading: () => undefined,
});

export const LoaderContextProvider: FC = (props): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contextValue: LoaderContextObj = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
