import React, { Suspense } from "react";
import { SingleLessonSkeleton } from "../../features/lessons";
import Container from "../../components/Container";
import SingleLesson from "../../components/SingleLesson";

const Lesson = () => {
  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="#F5F5F5"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <Suspense fallback={<SingleLessonSkeleton />}>
        <SingleLesson />
      </Suspense>
    </Container>
  );
};

export default Lesson;
