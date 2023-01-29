import { Box, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import "./Targets.scss";

const Targets: React.FC = () => {
  const { id } = useParams();
  const [textList, setTextList] = useState<string[]>([]);
  const [slug, setSlug] = useState("");
  const dispatch = useDispatch();

  const handleAddText = () => {
    if (textList.length >= 5) {
      toast.error("Thêm tối đa 5 mục tiêu", {
        position: "bottom-right",
      });
    } else {
      setTextList([...textList, ""]);
    }
  };

  const handleSave = () => {
    dispatch(isPending());
    courseApi
      .updateCourse(slug, {
        targets: textList,
      })
      .then(() => dispatch(isSuccess()));
  };

  useEffect(() => {
    dispatch(isPending());

    id &&
      teacherApi
        .getCourseDetails(id)
        .then((res: any) => {
          const { slug: _slugCourse, targets } = res.course;
          dispatch(isSuccess());
          setSlug(_slugCourse);
          setTextList(targets);
        })
        .catch(() => dispatch(isSuccess()));
  }, [id, dispatch]);

  return (
    <BoxContent.NormalContent>
      <TextContent.NormalText
        type="title-header-large"
        content="Mục tiêu khóa học"
      />
      <Divider />
      <div className="targets">
        <BoxContent.NormalContent style={{ padding: 0 }}>
          {textList.map((text, index) => (
            <FormControl.Input
              key={index}
              required
              value={text}
              onChange={(e) => {
                const _value = (e.target as HTMLInputElement).value;
                setTextList(
                  textList.map((textItem, i) => {
                    if (index === i) {
                      return _value;
                    }
                    return textItem;
                  })
                );
              }}
              placeholder="A desire for a higher TOEIC score"
            />
          ))}
          <Button
            type="submit"
            variant="outlined"
            color="error"
            sx={{
              height: 45,
              width: "fit-content",
            }}
            onClick={handleAddText}
          >
            <MediaContent.Icon icon="plus" color="#d32f2f" size={15} />
            <span style={{ marginLeft: "15px" }}>Thêm 1 dòng</span>
          </Button>
        </BoxContent.NormalContent>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            height: 45,
            display: "block",
            marginLeft: "auto",
            marginTop: "20px",
          }}
          onClick={handleSave}
        >
          Lưu thông tin
        </Button>
      </div>
    </BoxContent.NormalContent>
  );
};

export default Targets;
