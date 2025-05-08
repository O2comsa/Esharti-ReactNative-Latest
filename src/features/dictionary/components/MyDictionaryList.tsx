import { ScrollView, View } from "react-native";
import { Text } from "../../../components/custom/Text";
import SmallDictionaryCard from "./SmallDictionaryCard";
import useMyDictionary from "../hooks/useMyDictionary";

const MyDictionaryList = () => {
  const { data } = useMyDictionary();
  if (data.length === 0) return null;
  return (
    <View className="pt-[28px]">
      <Text className=" mx-layout mb-[10px]">القواميس التي تم شراؤها</Text>
      <ScrollView
        nestedScrollEnabled
        horizontal
        style={{ flexDirection: "row" }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}
        className="ml-layout"
      >
        {data?.map((dictionary) => (
          <SmallDictionaryCard key={dictionary.id} {...dictionary} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyDictionaryList;
