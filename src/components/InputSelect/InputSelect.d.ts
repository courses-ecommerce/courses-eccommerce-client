declare interface InputSelectProps {
  label?: string;
  icon?: string;
  list: {
    value: boolean | string | number;
    name: string;
  }[];
  name?: string;
  defaultValue?: string | number | boolean;
  errorMessage?: string;
  style?: CSSProperties;
  border?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}
