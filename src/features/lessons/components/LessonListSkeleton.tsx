import { View } from "../../../components/custom/View";
import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";

const LessonListSkeleton = () => {
  return (
    <View shadowVariant="small" className="bg-white rounded-xl">
      <View className="p-3 space-y-2">
        <View className="mb-5">
          <SkeletonPlaceholder
            height={20}
            width={150}
            backgroundColor="#EEEEEE"
            borderRadius={8}
          />
        </View>
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            className="flex-row items-center space-x-4 h-[66px] p-2 w-full bg-[#F5F5F5] rounded-xl"
          >
            <View>
              <SkeletonPlaceholder
                height={50}
                width={50}
                backgroundColor="#EEEEEE"
                borderRadius={8}
              />
            </View>
            <View>
              <SkeletonPlaceholder
                height={24}
                width={200}
                backgroundColor="#EEEEEE"
                borderRadius={8}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LessonListSkeleton;
