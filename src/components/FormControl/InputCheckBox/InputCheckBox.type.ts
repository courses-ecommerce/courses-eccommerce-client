export interface InputCheckBoxValue {
  label?: string;
  value?: boolean;
}

export interface InputCheckBoxProps {
  label?: string;
  value?: boolean;
  errorMessage?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  hint?: string;
  hideErrorMessage?: boolean;

  onChange?: (value: InputCheckBoxValue) => void;
}
