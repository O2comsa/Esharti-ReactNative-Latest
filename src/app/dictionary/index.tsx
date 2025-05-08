import { View } from "../../components/custom/View";
import DictionaryIcon from "../../assets/icons/DictionaryIcon.svg";
import { Text } from "../../components/custom/Text";
import Container from "../../components/Container";
import {
  DictionaryList,
  DictionarySkeleton,
  MyDictionaryList,
} from "../../features/dictionary";
import { Suspense } from "react";
import { ScrollView } from "react-native";
import useAuth from "../../hooks/useAuth";

export default function Dictionary() {
  const { session } = useAuth();
  return (
    <Container>
      <View className="flex-1 h-full bg-[#F5F5F5]">
        <View className="flex-row py-[28px] px-[21px] space-x-2 items-center bg-white">
          <DictionaryIcon
            height={29}
            width={29}
            stroke={"black"}
            strokeWidth={"1.8"}
          />
          <Text className=" text-neutral-900 text-[22px]">القاموس</Text>
        </View>
        <ScrollView
          style={{ minHeight: 400 }}
          className="flex-1 w-full"
          nestedScrollEnabled
        >
          {session?.authenticated && (
            <Suspense>
              <MyDictionaryList />
            </Suspense>
          )}
          <Suspense fallback={<DictionarySkeleton />}>
            <DictionaryList />
          </Suspense>
        </ScrollView>
      </View>
    </Container>
  );
}
