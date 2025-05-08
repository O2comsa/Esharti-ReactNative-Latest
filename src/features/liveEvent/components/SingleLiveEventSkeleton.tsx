import { View } from "react-native";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

const SingleLiveEventSkeleton = () => {
  return (
    <View className="px-layout bg-[#F5F5F5] flex-1">
      <View>
        <SkeletonPlaceholder
          height={194}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="pt-[15px] flex-row gap-x-[6px] items-center">
        <View>
          <SkeletonPlaceholder
            height={24}
            width={66}
            backgroundColor="#EEEEEE"
            borderRadius={12}
          />
        </View>
        <View>
          <SkeletonPlaceholder
            height={24}
            width={66}
            backgroundColor="#EEEEEE"
            borderRadius={12}
          />
        </View>
      </View>
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          width={250}
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
      <View className="mt-2">
        <SkeletonPlaceholder
          height={20}
          width={180}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
      <View className="mt-[20px]">
        <SkeletonPlaceholder
          height={40}
          width={200}
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
          width={180}
          backgroundColor="#EEEEEE"
          borderRadius={12}
        />
      </View>
    </View>
  );
};

export default SingleLiveEventSkeleton;
