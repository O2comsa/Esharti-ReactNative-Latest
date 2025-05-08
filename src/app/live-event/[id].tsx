import { Suspense } from "react";
import Container from "../../components/Container";
import { SingleLiveEventSkeleton } from "../../features/liveEvent";
import SingleLiveEvent from "../../components/SingleLiveEvent";

export default function LiveEvent() {
  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="#F5F5F5"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <Suspense fallback={<SingleLiveEventSkeleton />}>
        <SingleLiveEvent />
      </Suspense>
    </Container>
  );
}
