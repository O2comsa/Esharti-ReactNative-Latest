import { API } from "../lib/client";
import { authRoutes } from "../routes";
import { useSuspenseQuery } from "@tanstack/react-query";

const fetchBookmarkedArticle = async () => {
  const { data } = await API.get(authRoutes.getBookmarkedArticle);
  return data.data;
};
const fetchBookmarkedCourse = async () => {
  const { data } = await API.get(authRoutes.getBookmarkedCourse);
  return data.data;
};
const fetchBookmarkedDictionary = async () => {
  const { data } = await API.get(authRoutes.getBookamrkedDictionary);
  return data.data;
};
const fetchBookmarkedLessons = async () => {
  const { data } = await API.get(authRoutes.getBookmarkedLesson);
  return data.data;
};
export function useBookmarkedArticles() {
  return useSuspenseQuery({
    queryKey: ["bookmarkedarticle"],
    queryFn: fetchBookmarkedArticle,
    gcTime: 0,
  });
}

export function useBookmarkedCourses() {
  return useSuspenseQuery({
    queryKey: ["bookmarkedcourse"],
    queryFn: fetchBookmarkedCourse,
    gcTime: 0,
  });
}
export function useBookmarkedDictionaries() {
  return useSuspenseQuery({
    queryKey: ["bookmarkeddictionary"],
    queryFn: fetchBookmarkedDictionary,
    gcTime: 0,
  });
}

export function useBookmarkedLessons() {
  return useSuspenseQuery({
    queryKey: ["bookmarkedlesson"],
    queryFn: fetchBookmarkedLessons,
    gcTime: 0,
  });
}
