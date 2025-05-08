import React from "react";
import { View } from "../../../components/custom/View";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

const LargeCourseCardSkeleton = () => {
  return (
    <View shadowVariant="small" className="mt-[28px] bg-white rounded-xl">
      <View>
        <SkeletonPlaceholder
          borderRadius={1}
          height={194}
          backgroundColor="#EEEEEE"
        />
      </View>
      <View className="p-3 space-y-3">
        <View>
          <SkeletonPlaceholder
            height={20}
            width={200}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
        <View>
          <SkeletonPlaceholder
            height={20}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
        <View className="flex-row gap-x-2">
          <View>
            <SkeletonPlaceholder
              height={24}
              width={66}
              backgroundColor="#EEEEEE"
              borderRadius={20}
            />
          </View>
          <View>
            <SkeletonPlaceholder
              height={24}
              width={66}
              backgroundColor="#EEEEEE"
              borderRadius={20}
            />
          </View>
        </View>
        <View className="pt-5">
          <SkeletonPlaceholder
            height={48}
            backgroundColor="#EEEEEE"
            borderRadius={12}
          />
        </View>
      </View>
    </View>
  );
};

export default LargeCourseCardSkeleton;
