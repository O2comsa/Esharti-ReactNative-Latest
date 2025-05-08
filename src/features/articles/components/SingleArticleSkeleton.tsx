import { View } from "react-native";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

const SingleArticleSkeleton = () => {
  return (
    <View className="pt-[28px] space-y-3 px-layout bg-[#FFF] flex-1">
      <View>
        <SkeletonPlaceholder
          height={243}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="pt-4">
        <SkeletonPlaceholder
          height={30}
          width={250}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          width={150}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
    </View>
  );
};

export default SingleArticleSkeleton;
