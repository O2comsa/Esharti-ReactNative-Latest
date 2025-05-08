import { router, useLocalSearchParams } from "expo-router";
import Container from "../components/Container";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
export default function Payment() {
  const { paymentUri, navigatedFrom, id } = useLocalSearchParams<{
    paymentUri: string;
    navigatedFrom: string;
    id: string;
  }>();
  const [uri, setUri] = useState("");
  useEffect(() => {
    let timeOut: any;
    if (uri.includes("successfullyPayment")) {
      timeOut = setTimeout(() => {
        /*         if (id !== undefined) {
          queryClient.removeQueries({ queryKey: [navigatedFrom, id] });
        } else {
          queryClient.removeQueries({ queryKey: [navigatedFrom] });
        } */
        if (navigatedFrom === "plans") {
          return router.replace({
            pathname: "/paymentSuccess",
            params: { navigateTo: "/", paymentType: "plans" },
          });
        } else if (navigatedFrom === "Dictionaries") {
          return router.replace({
            pathname: "/paymentSuccess",
            params: { navigateTo: "/dictionary/", paymentType: "Dictionaries" },
          });
        } else if (navigatedFrom === "liveEvent") {
          return router.replace({
            pathname: "/paymentSuccess",
            params: {
              navigateTo: `/live-event/${id}`,
              paymentType: "liveEvent",
            },
          });
        } else {
          return router.replace({
            pathname: "/paymentSuccess",
            params: { navigateTo: `/courses/${id}`, paymentType: "course" },
          });
        }
      }, 2000);
    }
    if (uri.includes("failPayment")) {
      timeOut = setTimeout(() => {
        router.back();
      }, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [uri]);

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    setUri(url);
  };
  return (
    <Container showBottomTabs={false}>
      <WebView
        className="flex-1"
        source={{
          uri: paymentUri,
        }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </Container>
  );
}
