import SkeletonPlaceholder from "../../../components/custom/SkeletonPlaceholder";
import { View } from "../../../components/custom/View";

const CertificateListSkeleton = () => {
  return (
    <View className="mt-[28px] space-y-3 mx-layout">
      {[1, 2, 3, 4].map((item) => (
        <View key={item} className="bg-white h-[273px] rounded-xl">
          <SkeletonPlaceholder
            height={210}
            backgroundColor="#EEEEEE"
            borderRadius={12}
          />
          <View className="p-[17px]">
            <SkeletonPlaceholder
              height={20}
              backgroundColor="#EEEEEE"
              borderRadius={8}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default CertificateListSkeleton;
