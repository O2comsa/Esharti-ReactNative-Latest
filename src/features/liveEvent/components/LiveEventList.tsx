import React from "react";
import Swiper from "react-native-swiper";
import LiveEventCard from "./LiveEventCard";
import useLiveEvents from "../hooks/useLiveEvents";

const LiveEventList = () => {
  const { data } = useLiveEvents();

  if (data.length === 0) return null;
  return (
    <Swiper
      showsPagination={false}
      autoplay={data.length > 1}
      autoplayTimeout={5}
      className="h-[200px]"
    >
      {data.map((liveEvent) => {
        if (liveEvent.status === "active") {
          return <LiveEventCard key={liveEvent.id} {...liveEvent} />;
        }
      })}
    </Swiper>
  );
};

export default LiveEventList;
