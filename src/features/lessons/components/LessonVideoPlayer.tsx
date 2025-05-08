import { FC, useEffect, useRef, useState } from "react";
import { View } from "../../../components/custom/View";
import { z } from "zod";
import { Video, ResizeMode, Audio } from "expo-av";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { PlayButtonIcon } from "../../../components/SvgIcons";
import useCompleteLesson from "../hooks/useCompleteLesson";

const lessonVideoPlayerSchema = z.object({
  video: z.string(),
  posterUri: z.string(),
  lessonId: z.string(),
  completed: z.boolean(),
  course_id: z.string(),
});

type LessonVideoPlayerProps = z.infer<typeof lessonVideoPlayerSchema>;

const triggerAudio = async (ref: any) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
};

const LessonVideoPlayer: FC<LessonVideoPlayerProps> = ({
  video,
  posterUri,
  completed,
  lessonId,
  course_id,
}) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState<any>({});

  const [isPlayButtonClicked, setIsPlayButtonClicked] =
    useState<boolean>(false);
  useEffect(() => {
    if (status?.isPlaying) triggerAudio(videoRef);
  }, [videoRef, status?.isPlaying]);
  const { mutate: completeLessonHandler } = useCompleteLesson(
    lessonId,
    course_id
  );

  return (
    <View>
      <Video
        ref={videoRef}
        shouldPlay={false}
        className="h-[194px] w-full rounded-t-xl"
        PosterComponent={() => (
          <View className=" relative h-[194px] rounded-t-xl">
            <View className="bg-black/50 h-full w-full absolute z-10 rounded-t-xl flex-1 justify-center items-center">
              {!isPlayButtonClicked && (
                <TouchableOpacity
                  onPress={() => {
                    setIsPlayButtonClicked(true);
                    //@ts-ignore
                    videoRef?.current?.playAsync();
                  }}
                >
                  <PlayButtonIcon />
                </TouchableOpacity>
              )}
              {isPlayButtonClicked && (
                <ActivityIndicator size={"large"} color={"white"} />
              )}
            </View>

            <Image
              source={{ uri: posterUri }}
              className="h-[194px] rounded-t-xl"
            />
          </View>
        )}
        usePoster
        source={{
          uri: video,
        }}
        useNativeControls
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={(status: any) => {
          setStatus(() => status);
          if (status?.didJustFinish && !completed) {
            completeLessonHandler();
          }
        }}
      />
    </View>
  );
};

export default LessonVideoPlayer;
