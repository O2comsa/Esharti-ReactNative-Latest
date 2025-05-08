import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { FolderDownloadIcon } from "../../../components/SvgIcons";
import * as Print from "expo-print";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { certificateProps } from "../../../types/certificate";

const CertificateCard: FC<certificateProps> = ({
  file_pdf,
  related: { title },
}) => {
  const print = async () => {
    try {
      await Print.printAsync({
        uri: file_pdf,
        orientation: Print.Orientation.landscape,
        margins: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      });
    } catch (error) {}
  };
  return (
    <TouchableOpacity onPress={print} className="">
      <View className="rounded-xl bg-white" shadowVariant="small">
        <View className="h-[218px] bg-[#FEE8B2] rounded-xl justify-center items-center">
          <MaterialCommunityIcons
            name="certificate-outline"
            size={100}
            color="white"
          />
        </View>
        <View className=" flex-row justify-between items-center p-[18px]">
          <Text className="text-[18px]">{title}</Text>
          <FolderDownloadIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CertificateCard;
