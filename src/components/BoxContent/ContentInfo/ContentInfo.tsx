import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import TextContent from "../../TextContent";

type ContentInfoType = "fit-content" | "equal-divide";

interface ContentInfoProps {
  title: string;
  content?: string | number;
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
  type?: ContentInfoType;
}

const ContentInfo: React.FC<ContentInfoProps> = ({
  title,
  content = "Chưa có thông tin",
  className,
  style,
  responsive = true,
  type = "equal-divide",
}) => {
  if (useMediaQuery("(max-width: 536px)") && responsive) {
    return (
      <Box className={className} style={style}>
        <TextContent.NormalText
          type="description"
          style={{ flex: 1 }}
          content={content as string}
        />
      </Box>
    );
  }

  return (
    <Box
      className={className}
      display="flex"
      width="100%"
      style={style}
      gap={type === "equal-divide" ? 0 : 20}
    >
      <TextContent.NormalText
        className="title"
        type="title-content"
        content={title}
        style={type === "equal-divide" ? { flex: 1 } : { width: "fit-content" }}
      />
      <TextContent.NormalText
        type="description"
        style={type === "equal-divide" ? { flex: 1 } : { width: "fit-content" }}
        content={content as string}
      />
    </Box>
  );
};
export default ContentInfo;
