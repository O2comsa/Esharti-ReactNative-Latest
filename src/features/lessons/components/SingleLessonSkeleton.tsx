import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

type Props = {};

const SingleLessonSkeleton = (props: Props) => {
  return (
    <View className="mt-[28px] space-y-3 mx-layout">
      <View className="bg-white h-[315px] rounded-xl overflow-hidden">
        <SkeletonPlaceholder
          height={210}
          backgroundColor="#EEEEEE"
          borderRadius={1}
        />
        <View className="py-[19px] px-[15px] space-y-2">
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
          <View>
            <SkeletonPlaceholder
              height={20}
              width={150}
              backgroundColor="#EEEEEE"
              borderRadius={8}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center gap-2">
        <View className="flex-grow">
          <SkeletonPlaceholder
            height={59}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
        <View className="flex-grow">
          <SkeletonPlaceholder
            height={59}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
      </View>
    </View>
  );
};

export default SingleLessonSkeleton;
