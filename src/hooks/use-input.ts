import { ChangeEvent, useReducer } from 'react';

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction = {
  type: InputActionType;
  value?: string;
};

enum InputActionType {
  INPUT = 'INPUT',
  BLUR = 'BLUR',
  RESET = 'RESET',
  SUBMIT = 'SUBMIT',
}

const initialInputState: InputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (
  state: InputState,
  action: InputAction,
): InputState => {
  switch (action.type) {
    case InputActionType.INPUT:
      return { value: action.value || '', isTouched: state.isTouched };
    case InputActionType.BLUR:
      return { isTouched: true, value: state.value };
    case InputActionType.RESET:
      return { isTouched: false, value: '' };
    case InputActionType.SUBMIT:
      return { isTouched: true, value: state.value };
    default:
      return initialInputState;
  }
};

const useInput = (
  validateValue: (value: string) => boolean,
): {
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  submitHandler: () => void;
  reset: () => void;
} => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState,
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const submitHandler = () => {
    dispatch({ type: InputActionType.SUBMIT });
  };

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.INPUT, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: InputActionType.BLUR });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET });
  };

  return {
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    submitHandler,
    reset,
  };
};

export default useInput;
