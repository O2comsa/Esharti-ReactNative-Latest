import BottomTabs from "./BottomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import ErrorBoundary from "./ErrorBoundary";
import { useEffect } from "react";
import { router } from "expo-router";
import useAuth from "../hooks/useAuth";

type ContainerProps = {
  children: React.ReactNode;
  topSafeAreaViewColor?: string;
  bottomSafeAreaViewColor?: string;
  showBottomTabs?: boolean;
  withAuth?: boolean;
};

export default function Container({
  children,
  topSafeAreaViewColor = "white",
  bottomSafeAreaViewColor = "white",
  showBottomTabs = true,
  withAuth = false,
}: ContainerProps) {
  const { session } = useAuth();

  useEffect(() => {
    if (withAuth) {
      if (!session?.authenticated) {
        router.back();
      }
    }
  }, [withAuth]);
  return (
    <>
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ flex: 0, backgroundColor: topSafeAreaViewColor }}
      />
      <View className="flex-1" style={{ direction: "rtl" }}>
        <View
          style={{ flex: showBottomTabs ? 0.9 : 1 }}
          className="bg-[#F5F5F5]"
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </View>
        {showBottomTabs && (
          <View style={{ flex: 0.1 }}>
            <BottomTabs />
          </View>
        )}
      </View>
      <SafeAreaView
        edges={["bottom"]}
        style={{ backgroundColor: bottomSafeAreaViewColor }}
      />
    </>
  );
}
