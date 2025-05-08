import { View } from "react-native";
import React from "react";
import { Text } from "../../../components/custom/Text";
import LessonCard from "./LessonCard";

const lessons = [
  { id: 1, title: "المقدمة: ما هي لغة الإشارة" },
  { id: 2, title: "الدرس الأول: الحروف بلغة الإشارة" },
  { id: 3, title: "الدرس الثاني: الحروف بلغة الإشارة" },
  { id: 4, title: "الدرس الثالث: الحروف بلغة الإشارة" },
  { id: 5, title: "الدرس الرابع: الحروف بلغة الإشارة" },
  { id: 6, title: "الخاتمة: الحروف بلغة الإشارة" },
];
const Lessonlist = () => {
  return (
    <View>
      <Text className="text-primary mb-3">المحاور الأساسية للدورة</Text>
      <View className="flex space-y-2">
        {lessons.map((lesson) => (
          <View key={lesson.id}>
            <LessonCard key={lesson.id} {...lesson} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Lessonlist;
