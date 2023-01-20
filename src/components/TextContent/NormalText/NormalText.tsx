import { Typography } from "@mui/material";

type NormalTextType = "title-header" | "title-content" | "description";

interface NormalTextProps {
  type?: NormalTextType;
  content: string;
  className?: string;
  component?: React.ElementType;
  style?: React.CSSProperties;
}

const NormalText: React.FC<NormalTextProps> = ({
  type = "title-header",
  content,
  className,
  component = "span",
  style,
}) => {
  if (type === "title-content") {
    return (
      <Typography
        className={className}
        component={component}
        style={style}
        variant="body1"
        fontWeight={600}
      >
        {content || "Chưa có thông tin"}
      </Typography>
    );
  }

  if (type === "description") {
    return (
      <Typography
        className={className}
        component={component}
        style={style}
        variant="body1"
      >
        {content || "Chưa có thông tin"}
      </Typography>
    );
  }

  return (
    <Typography
      className={className}
      component={component}
      style={style}
      variant="h6"
      fontWeight={600}
    >
      {content || "Chưa có thông tin"}
    </Typography>
  );
};

export default NormalText;
