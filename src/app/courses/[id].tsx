import { useLocalSearchParams } from "expo-router";
import Container from "../../components/Container";
import { SingleCourseSkeleton } from "../../features/courses";
import { Suspense } from "react";
import SingleCourse from "../../components/SingleCourse";

const Course = () => {
  const { id }: { id: string } = useLocalSearchParams();
  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="#F5F5F5"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <Suspense fallback={<SingleCourseSkeleton />}>
        <SingleCourse courseId={id} />
      </Suspense>
    </Container>
  );
};

export default Course;
