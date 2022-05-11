declare interface DropdownProps {
  label?: string;
  icon?: string;
  list: {
    id: number | string;
    name: string;
  }[];
  name?: string;
  defaultValue?: string | number;
  errorMessage?: string;
  style?: CSSProperties;
  border?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}
