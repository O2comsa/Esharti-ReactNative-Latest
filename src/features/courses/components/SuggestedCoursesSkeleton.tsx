import React from "react";
import { View } from "../../../components/custom/View";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

type Props = {};

const SuggestedCoursesSkeleton = (props: Props) => {
  return (
    <View className="flex-row space-x-2 ml-layout py-3">
      <View>
        <SkeletonPlaceholder
          height={168}
          width={142}
          borderRadius={8}
          backgroundColor="#EEEEEE"
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={168}
          width={142}
          borderRadius={8}
          backgroundColor="#EEEEEE"
        />
      </View>
      <View>
        <SkeletonPlaceholder
          height={168}
          width={142}
          borderRadius={8}
          backgroundColor="#EEEEEE"
        />
      </View>
    </View>
  );
};

export default SuggestedCoursesSkeleton;
