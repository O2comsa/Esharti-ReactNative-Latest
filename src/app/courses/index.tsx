import AcademicCapIcon from "../../assets/icons/AcademicCapIcon.svg";
import { Text } from "../../components/custom/Text";
import { View } from "../../components/custom/View";
import Container from "../../components/Container";
import {
  CoursesList,
  CoursesListSkeleton,
  MyCoursesList,
} from "../../features/courses";
import { ScrollView } from "react-native-gesture-handler";
import { Suspense } from "react";
import useAuth from "../../hooks/useAuth";

export default function Courses() {
  const { session } = useAuth();
  return (
    <Container>
      <View className="h-[91px] bg-white px-[22] py-[28px]">
        <View className="flex-row items-center gap-x-[9px]">
          <AcademicCapIcon
            height={29}
            width={29}
            strokeWidth={1.8}
            stroke={"#040404"}
          />
          <Text className="text-[22px]">الدورات التدريبية</Text>
        </View>
      </View>
      <ScrollView>
        <Suspense fallback={<CoursesListSkeleton />}>
          {session?.authenticated && <MyCoursesList />}
          <CoursesList />
        </Suspense>
      </ScrollView>
    </Container>
  );
}
