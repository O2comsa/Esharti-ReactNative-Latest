import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";
import { View } from "../../../components/custom/View";

const DictionarySkeleton = () => {
  return (
    <View className="mt-[28px] space-y-3 mx-layout">
      <View>
        <SkeletonPlaceholder
          height={190}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={190}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={190}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={190}
          backgroundColor="#EEEEEE"
          borderRadius={8}
        />
      </View>
    </View>
  );
};

export default DictionarySkeleton;
