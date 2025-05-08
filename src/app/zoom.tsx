import Container from "../components/Container";
import { WebView } from "react-native-webview";
import { router, useLocalSearchParams } from "expo-router";
import useAuth from "../hooks/useAuth";
export default function Zoom() {
  const { meetingId, meetingPassword } = useLocalSearchParams();
  const { session } = useAuth();

  return (
    <Container showBottomTabs={false}>
      <WebView
        scalesPageToFit={true}
        useWebView2
        cacheEnabled={false}
        originWhitelist={["*"]}
        onNavigationStateChange={(data) => {
          const { url } = data;
          if (!url.includes("zoom")) {
            router.replace("/");
          }
          if (url === "https://app.zoom.us/wc") {
            router.replace("/");
          }
        }}
        className="flex-1"
        source={{
          uri: `https://zoom.us/wc/${meetingId}/join?prefer=1&pwd=${meetingPassword}&uname=${session?.user?.name}`,
        }}
      />
    </Container>
  );
}
