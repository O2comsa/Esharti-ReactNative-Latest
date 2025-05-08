import Container from "../../components/Container";
import { SingleArticle, SingleArticleSkeleton } from "../../features/articles";
import { Suspense } from "react";

export default function Article() {
  return (
    <Container showBottomTabs={false}>
      <Suspense fallback={<SingleArticleSkeleton />}>
        <SingleArticle />
      </Suspense>
    </Container>
  );
}
