import React, { useLayoutEffect } from "react";
import { router } from "expo-router";

const Unmatched = () => {
  useLayoutEffect(() => {
    router.replace("/");
  }, []);
  return <></>;
};

export default Unmatched;
