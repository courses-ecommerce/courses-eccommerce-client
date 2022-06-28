import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import courseApi from "src/apis/courseApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { IRating } from "src/types/myCourse";

interface AcceptMyCourseProps {
  id?: string | number;
  slug?: string;
  show?: boolean;
  value?: IRating;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const AcceptMyCourse: React.FC<AcceptMyCourseProps> = ({
  id,
  slug,
  onClose,
  value,
  show,
  setShow,
}) => {
  const dispatch = useDispatch();
  // console.log("value laf", value);

  const [publish, setPublish] = useState<boolean>(true);

  const handleRating = async (e: any) => {
    e.preventDefault();
    const { content } = e.target;
    if (!publish && !content.value) {
      toast.warning("Vui lòng nhập lý do từ chối", {
        position: "bottom-right",
      });
      return;
    }
    const params = { publish, content: content?.value };

    // console.log("slug là", slug);
    // console.log("params truyền là", params);
    dispatch(isPending());
    setShow?.(true);
    try {
      await courseApi.updateCourse(slug, params);
      // console.log("response", response);
      toast.success("Thao tác thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Duyệt khoá học thất bại, hãy thử lại sau", {
        position: "bottom-right",
      });
    }
    setShow?.(false);
    dispatch(isSuccess());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value", event.target.checked);
    setPublish(event.target.checked);
  };

  return (
    <ModalContainer
      width={700}
      title="Tiến hành xác nhận duyệt khoá học"
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
          <FormControlLabel
            control={
              <Switch defaultChecked={publish} onChange={handleChange} />
            }
            label={!publish ? "Không duyệt khoá học" : "Duyệt khoá học"}
          />
          {!publish && (
            <TextField
              name="content"
              fullWidth
              label="Nhập nội lý do từ chối"
            />
          )}
          <Button type="submit" variant="contained" color="warning">
            Xác nhận hoàn tất
          </Button>
        </Box>
      </form>
    </ModalContainer>
  );
};

export default AcceptMyCourse;
