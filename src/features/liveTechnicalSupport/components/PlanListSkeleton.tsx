import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";
import { View } from "../../../components/custom/View";

const PlanListSkeleton = () => {
  return (
    <View className="space-y-3">
      <View>
        <SkeletonPlaceholder
          height={20}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>

      <View>
        <SkeletonPlaceholder
          height={20}
          width={300}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={20}
          width={280}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={160}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={160}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={160}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
    </View>
  );
};

export default PlanListSkeleton;
