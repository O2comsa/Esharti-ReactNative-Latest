import { ActivityIndicator, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "../../components/custom/View";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon.svg";
import Container from "../../components/Container";
import Bookmark from "../../components/Bookmark";
import useSingleDictionary from "../../features/dictionary/hooks/useSingleDictionary";
import ShareButton from "../../components/ShareButton";
import Pdf from "react-native-pdf";
import { useEffect, useState } from "react";
import { Text } from "../../components/custom/Text";
import { useSettingsList } from "../../features/account";

export default function SingleDictionary() {
  const { id }: { id: string } = useLocalSearchParams();

  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");

  const { data } = useSingleDictionary(String(id));
  useEffect(() => {
    if (data?.purchased === false && reviewStatus?.value === "0") {
      router.replace("/dictionary/");
    }
  }, [data, reviewStatus]);

  const pdfSource = {
    uri: data?.file_pdf,
    cache: true,
  };
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  return (
    <Container showBottomTabs={false} topSafeAreaViewColor="#F5F5F5" withAuth>
      <View className="bg-[#F5F5F5] flex-1">
        <View className="flex-row items-center justify-between mx-[18px] my-[23px]">
          <View className="flex-row items-center gap-[10px]">
            <View>
              <Bookmark
                bookmarked={data ? data?.bookmarked : false}
                variant="dictionary"
                id={String(data?.id)}
              />
            </View>
            <View>
              <ShareButton
                description={data ? data?.description : ""}
                title={data ? data?.title : ""}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => router.replace("/dictionary/")}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>
        {numberOfPages !== 0 && (
          <View className="items-center">
            <Text className="text-gray-500">
              {currentPage} / {numberOfPages}
            </Text>
          </View>
        )}
        <Pdf
          trustAllCerts={false}
          style={{ flex: 1 }}
          onLoadComplete={(numberOfPages) => {
            setNumberOfPages(numberOfPages);
          }}
          onLoadProgress={(data) => console.log(data)}
          onPageChanged={(page, numberOfPages) => {
            setCurrentPage(page);
          }}
          renderActivityIndicator={() => <ActivityIndicator size="large" />}
          source={pdfSource}
        />
      </View>
    </Container>
  );
}
