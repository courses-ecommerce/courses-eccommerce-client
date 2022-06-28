declare interface InputSelectProps {
  disabled?: true | false;
  label?: string;
  icon?: string;
  required?: boolean;
  list: {
    value?: boolean | string | number | object;
    name: string;
  }[];
  name?: string;
  defaultValue?: string | number | boolean;
  hideErrorMessage?: boolean;
  errorMessage?: string;
  style?: CSSProperties;
  border?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}
