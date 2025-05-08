import { ScrollView } from "react-native";
import { View } from "./custom/View";
import { CourseCard } from "../features/courses";
import useSuggestedCourses from "../features/courses/hooks/useSuggestedCourses";

const SuggestedCoursesList = () => {
  const { data } = useSuggestedCourses();

  return (
    <View className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        className="ml-layout"
      >
        {data?.map((course) => (
          <CourseCard
            variant="small"
            key={course.id}
            {...course}
            duration={"50"}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggestedCoursesList;
