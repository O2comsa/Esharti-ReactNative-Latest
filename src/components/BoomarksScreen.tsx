import { ScrollView } from "react-native";
import React from "react";
import {
  useBookmarkedArticles,
  useBookmarkedCourses,
  useBookmarkedDictionaries,
  useBookmarkedLessons,
} from "../hooks/useBookmarked";
import { CourseCard } from "../features/courses";
import { ArticleCard } from "../features/articles";
import { courseProps } from "../types/course";
import { articleProps } from "../types/article";
import { dictionaryProps } from "../types/dictionary";
import { DictionaryCard } from "../features/dictionary";
import { View } from "./custom/View";
import { Text } from "./custom/Text";
import { lessonProps } from "../types/lesson";
import { LessonCard } from "../features/lessons";

const BoomarksScreen = () => {
  const { data: articles } = useBookmarkedArticles();
  const { data: courses } = useBookmarkedCourses();
  const { data: dictionaries } = useBookmarkedDictionaries();
  const { data: lessons } = useBookmarkedLessons();
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 19, paddingVertical: 20 }}
      className="space-y-[10px]"
    >
      {!!courses?.length && (
        <View>
          <Text className="mb-[10px] text-[14px]">دورات</Text>
          {courses.map((course: courseProps) => (
            <CourseCard
              key={course.id}
              variant="medium"
              showSubscribeButton={false}
              {...course}
            />
          ))}
        </View>
      )}
      {!!articles?.length && (
        <View>
          <Text className="mb-[10px] text-[14px]">موضوعات</Text>
          {articles?.map((article: articleProps) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </View>
      )}
      {!!dictionaries?.length && (
        <View>
          <Text className="mb-[10px] text-[14px]">ادلة ارشادية</Text>
          {dictionaries.map((dictionary: dictionaryProps) => (
            <DictionaryCard
              showSubscribeButton={false}
              key={dictionary.id}
              {...dictionary}
            />
          ))}
        </View>
      )}
      {!!lessons?.length && (
        <View>
          <Text className="mb-[10px] text-[14px]">الدروس</Text>
          {lessons.map((lesson: lessonProps) => (
            <LessonCard
              key={lesson.id}
              {...lesson}
              subscribed
              bgColor={"white"}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BoomarksScreen;
