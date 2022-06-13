declare interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string | null;
  icon?: string;
  colorIcon?: string;
  sizeIcon?: number;
  outline?: boolean;
  name?: string;
  type?: string;
  value?: string | number;
  required?: boolean;
  maxLength?: number;
  checked?: boolean;
  disabled?: boolean;
  hint?: string;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
  autoComplete?: string;
}
