import ModalContainer from "src/components/ModalContainer";

interface DeleteQuizItemProps {
  show?: boolean;
  isUpdateCompleted?: (status: boolean) => void;
  onClose?: () => void;
}

const DeleteQuizItem: React.FC<DeleteQuizItemProps> = ({
  show,
  onClose,
  isUpdateCompleted,
}) => {
  return (
    <ModalContainer
      title="Bạn có chắc xóa câu hỏi này?"
      open={show}
      onClose={onClose}
    >
      DeleteQuizItem
    </ModalContainer>
  );
};

export default DeleteQuizItem;
