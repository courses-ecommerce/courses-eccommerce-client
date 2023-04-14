import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import { InputCheckBoxValue } from "src/components/FormControl/InputCheckBox";
import ModalContainer from "src/components/ModalContainer";
import TextContent from "src/components/TextContent";
import { notificationMessage } from "src/utils";

interface CreateNewQuizItemProps {
  show?: boolean;
  isUpdateCompleted?: (status: boolean) => void;

  onClose?: () => void;
}

const CreateNewQuizItem: React.FC<CreateNewQuizItemProps> = ({
  show,
  isUpdateCompleted,
  onClose,
}) => {
  const [answer, setAnswer] = useState<InputCheckBoxValue>({
    label: "",
    value: false,
  });
  const [answers, setAnswers] = useState<InputCheckBoxValue[]>([answer]);
  const [questionName, setQuestionName] = useState("");

  const addNewQuizItem = () => {
    console.log("add new quiz item", {
      question: questionName,
      answers,
    });
  };

  const addOneNewQuestion = () => {
    console.log(answers);

    if (!answer) return;

    if (answers.length > 3) {
      return notificationMessage("warning", "Tối đa 4 câu trả lời");
    }
    return setAnswers([...answers, answer]);
  };

  useEffect(() => {
    renderAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  const renderAnswer = () => {
    return answers.map((answer, index) => (
      <FormControl.InputCheckBox
        key={index}
        label="Đáp án đúng"
        onChange={(value) => setAnswer(value)}
      />
    ));
  };

  return (
    <ModalContainer
      title="Tạo thêm 1 câu hỏi mới"
      open={show}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={15}>
        <FormControl.Input
          required
          label="Nhập tên câu hỏi"
          name="quiz"
          onChange={(e: any) => setQuestionName(e.target.value)}
        />
        <Divider />
        <BoxContent.NormalContent style={{ padding: 0, gap: 10 }}>
          <TextContent.Label label="Câu trả lời" required />
          {renderAnswer()}
          <Button
            variant="contained"
            color="secondary"
            onClick={addOneNewQuestion}
          >
            Thêm 1 đáp án mới
          </Button>
        </BoxContent.NormalContent>

        <Button variant="contained" color="success" onClick={addNewQuizItem}>
          Tạo câu hỏi mới
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default CreateNewQuizItem;
