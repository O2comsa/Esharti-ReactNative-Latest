import { ScrollView, View } from "react-native";
import { Text } from "../../../components/custom/Text";
import CourseCard from "./CourseCard";
import useMyCourses from "../hooks/useMyCourses";

const MyCoursesList = () => {
  const { data } = useMyCourses();
  if (data.length === 0) return null;
  return (
    <View className="pt-[28px]">
      <Text className=" mx-layout mb-[10px]">الدورات المسجل فيها</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
        className="ml-layout"
      >
        {data?.map((course) => (
          <CourseCard variant="small" key={course.id} {...course} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyCoursesList;
