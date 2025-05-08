import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";
import { View } from "../../../components/custom/View";

const ArticlesSkeleton = () => {
  return (
    <View className="mt-[28px] space-y-1 mx-layout">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <View key={item}>
          <SkeletonPlaceholder
            height={98}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
      ))}
    </View>
  );
};

export default ArticlesSkeleton;
