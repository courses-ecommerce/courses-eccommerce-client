import { Box } from "@mui/material";
import { FC } from "react";
import TextContent from "src/components/TextContent";
import { Quiz } from "src/types";

interface QuizContentProps {
  quizzes: Quiz[];
}

const QuizContent: FC<QuizContentProps> = ({ quizzes }) => {
  if (!quizzes.length) {
    return (
      <TextContent.NormalText
        content="Không có nội dung hiển thị"
        style={{ margin: "auto " }}
      />
    );
  }

  return <Box>Quiz</Box>;
};

export default QuizContent;
