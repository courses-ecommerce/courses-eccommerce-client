import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ratingApi from "src/apis/ratingApi";
import ModalContainer from "src/components/ModalContainer";
import Rating from "src/components/Rating/Rating";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface RatingMyCourseProps {
  id?: string | number;
  slug?: string;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const RatingMyCourse: React.FC<RatingMyCourseProps> = ({
  id,
  slug,
  onClose,
  show,
  setShow,
}) => {
  const dispatch = useDispatch();

  const [star, setStar] = useState();

  const handleRating = async (e: any) => {
    e.preventDefault();
    const { rating, content } = e.target;
    if (!rating.value || rating.value === 0) {
      toast.warning("Số sao rating phải lớn hơn 0", {
        position: "bottom-right",
      });
      return;
    }

    const params = { rate: rating.value * 1, content: content.value, slug };
    // console.log("params truyền là", params);
    dispatch(isPending());
    setShow?.(true);
    try {
      await ratingApi.postRate(params);
      toast.success("Đánh giá khoá học thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Đánh giá khoá học thất bại, hãy thử lại sau", {
        position: "bottom-right",
      });
    }
    setShow?.(false);
    dispatch(isSuccess());
  };

  return (
    <ModalContainer
      width={700}
      title="Đánh giá khoá học"
      open={show}
      onClose={onClose}
    >
      <form onSubmit={handleRating}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span style={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <b>Đánh giá:</b>
            <Rating
              isReadOnly={false}
              isShowTotalRating={false}
              average_rating={star}
              onChange={(e: any) => setStar(e.target.value)}
            />
          </span>
          <TextField name="content" fullWidth label="Nhập nội dung đánh giá" />
          <Button type="submit" variant="contained">
            Đánh giá
          </Button>
        </Box>
      </form>
    </ModalContainer>
  );
};

export default RatingMyCourse;
