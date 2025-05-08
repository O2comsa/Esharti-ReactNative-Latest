import { ScrollView } from "react-native";
import React from "react";
import CertificateCard from "./CertificateCard";
import useCertificates from "../hooks/useCertificates";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";

const CertificateList = () => {
  const { data, isLoading } = useCertificates();

  return (
    <>
      {data.length === 0 && (
        <View className="items-center mt-10">
          <Text className="text-lg text-gray-500" fontWeight="500">
            لا توجد لديك شهادات مكتسبة
          </Text>
        </View>
      )}
      {data.length !== 0 && (
        <ScrollView scrollEnabled={!isLoading} className="mx-layout pt-[26px]">
          {data?.map((certificate) => (
            <CertificateCard key={certificate.id} {...certificate} />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default CertificateList;
