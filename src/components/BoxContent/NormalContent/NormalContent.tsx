import { Box } from "@mui/material";

interface NormalContentProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const NormalContent: React.FC<NormalContentProps> = ({ children, style }) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={20}
      padding={20}
      borderRadius={3}
      style={style}
    >
      {children}
    </Box>
  );
};

export default NormalContent;
