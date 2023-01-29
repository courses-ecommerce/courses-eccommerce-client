import { Box, Button, Divider } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import { CourseStatus } from "src/types";
import * as Yup from "yup";
import { ICategoriesCourse } from "../../TeacherCourseDetail.type";

interface CourseInformationProps {
  slug?: string;
  courseStatus?: CourseStatus;
  isUpdateCompleted?: (status: boolean) => void;
  courseInformationValue?: any;
}

const CourseInformation: React.FC<CourseInformationProps> = ({
  slug,
  courseStatus,
  isUpdateCompleted,
  courseInformationValue,
}) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState();
  const [categories, setCategories] = useState<ICategoriesCourse[]>([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      category: "",
      originalPrice: "",
      currentPrice: "",
      thumbnail: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      originalPrice: Yup.number().required("Vui lòng nhập giá gốc khóa học"),
      currentPrice: Yup.number().required(
        "Vui lòng nhập giá khuyến mãi khóa học"
      ),
    }),
    validate: (values) => {
      let errors = {};
      if (Number(values.currentPrice) > Number(values.originalPrice)) {
        errors = {
          ...errors,
          currentPrice: "Giá khuyến mãi phải nhỏ hơn giá gốc",
        };
      }

      return errors;
    },
    onSubmit: async (values) => {
      dispatch(isPending());
      isUpdateCompleted?.(false);
      console.log("image", image, typeof image);

      courseApi
        .updateCourse(slug, {
          ...values,
          thumbnail: image,
          originalPrice: Number(values.originalPrice),
          currentPrice: Number(values.currentPrice),
        })
        .then(() => {
          dispatch(isSuccess());
          isUpdateCompleted?.(true);
          toast.success("Update thông tin khóa học thành công", {
            position: "bottom-right",
          });
        });
    },
  });

  useEffect(() => {
    categoryApi.getCategories().then((res: any) => {
      setCategories(
        res.categories.map((category: any) => {
          return { value: category._id, name: category.name };
        })
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    formik.setValues(courseInformationValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseInformationValue]);

  const postImage = (image: any) => {
    dispatch(isPending());
    const formData = new FormData();
    formData.append("image", image);

    courseApi
      .uploadImage(formData)
      .then((res: any) => {
        dispatch(isSuccess());
        const { message, url } = res;
        toast.success(`${message}`, {
          position: "bottom-right",
        });
        setImage(url);
      })
      .catch((err) => {
        dispatch(isSuccess());
        console.log("Lỗi rồi", err);
      });
  };

  return (
    <BoxContent.NormalContent>
      <BoxContent.NormalContent flexDirectionType="row" style={{ padding: 0 }}>
        <TextContent.NormalText
          type="title-header-large"
          content="Thông tin khóa học"
        />
        {/* I dont know exactly typeof here. 
          I will fix it, when I have sufficient knowledge ^^ */}
        <BoxContent.NormalContent
          flexDirectionType="row"
          style={{ maxWidth: "fit-content", gap: 5, padding: 0 }}
        >
          <TextContent.Label label="Trạng thái khóa học:" />
          <TextContent.ErrorMessage
            message={CourseStatus[courseStatus as never]}
          />
        </BoxContent.NormalContent>
      </BoxContent.NormalContent>
      <Divider />
      <Box
        display="flex"
        flexDirection="column"
        gap={20}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <FormControl.InputUploadFile
          className="thumbnail-course"
          label="Thumbnail khóa học"
          valueDefault={formik.values.thumbnail}
          // onChange={(value) => formik.setFieldValue("thumbnail", value)}
          onChange={(value) => postImage(value)}
        />
        <FormControl.Input
          required
          label="Tên khóa học"
          placeholder="Nhập tên khóa học"
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />
        <FormControl.Input
          required
          label="Giá gốc khóa học"
          placeholder="1.200.000 đ"
          errorMessage={
            formik.touched.originalPrice ? formik.errors.originalPrice : ""
          }
          {...formik.getFieldProps("originalPrice")}
        />
        <FormControl.Input
          required
          label="Giá khuyến mãi khóa học"
          placeholder="1.000.000 đ"
          errorMessage={
            formik.touched.currentPrice ? formik.errors.currentPrice : ""
          }
          {...formik.getFieldProps("currentPrice")}
        />
        <div className="editor">
          <h2>
            Nội dung khóa học <span>*</span>
          </h2>
          <FormControl.FormEditor
            style={{
              height: 120,
            }}
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
            placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
          />
        </div>
        {formik.touched.description && (
          <div className="editor-error">{formik.errors.description}</div>
        )}
        <FormControl.InputSelect
          label="Loại khóa học"
          list={categories}
          onChange={(category_type) =>
            formik.setFieldValue("category", category_type)
          }
          defaultValue={formik.values.category}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            height: 45,
            width: "fit-content",
            marginLeft: "auto",
          }}
        >
          Lưu thông tin
        </Button>
      </Box>
    </BoxContent.NormalContent>
  );
};

export default CourseInformation;
