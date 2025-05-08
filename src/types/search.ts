import { articleProps } from "./article";
import { courseProps } from "./course";
import { dictionaryProps } from "./dictionary";
import { lessonProps } from "./lesson";

export type searchProps = {
  articles: articleProps[];
  courses: courseProps[];
  dictionaries: dictionaryProps[];
  lessons: lessonProps[];
};
