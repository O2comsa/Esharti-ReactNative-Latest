import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { BookmarkOutlineIcon } from "./SvgIcons";
import useBookmark from "../hooks/useBookmark";
import { router, usePathname } from "expo-router";
import useAuth from "../hooks/useAuth";

type BookmarkProps = {
  id: string;
  variant: "course" | "lesson" | "article" | "dictionary";
  bookmarked: boolean;
};
const Bookmark: FC<BookmarkProps> = ({ id, variant, bookmarked = false }) => {
  const { mutate: bookmarkHandler, isPending } = useBookmark(id, variant);
  const path = usePathname();

  const { session } = useAuth();
  return (
    <TouchableOpacity
      disabled={isPending}
      onPress={() =>
        session?.authenticated
          ? bookmarkHandler()
          : router.push({ pathname: "/auth/", params: { navigatedFrom: path } })
      }
    >
      <BookmarkOutlineIcon
        fill={bookmarked ? "#040404" : "none"}
        stroke={"#040404"}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
};

export default Bookmark;
