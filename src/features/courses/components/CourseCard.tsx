import SmallCourseCard from "./CourseCardVariants/SmallCourseCard";
import MediumCourseCard from "./CourseCardVariants/MediumCourseCard";
import LargeCourseCard from "./CourseCardVariants/LargeCourseCard";
import { courseProps } from "../../../types/course";

type cousreCardProps = {
  showSubscribeButton?: boolean;
  variant: "small" | "medium" | "large";
} & courseProps;

const CourseCard = ({ variant = "small", ...restProps }: cousreCardProps) => {
  return (
    <>
      {variant === "small" && <SmallCourseCard {...restProps} />}
      {variant === "medium" && <MediumCourseCard {...restProps} />}
      {variant === "large" && <LargeCourseCard {...restProps} />}
    </>
  );
};

export default CourseCard;
