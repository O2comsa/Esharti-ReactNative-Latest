import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "./custom/Text";

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <View className="items-center flex-1 justify-center">
              <View className="bg-primary rounded-full py-1 px-4 items-center mb-2">
                <Text className="text-white text-[20px] text-center">!</Text>
              </View>
              <Text className="text-lg">مع الأسف حدث خطأ ما!</Text>
              <Text
                fontWeight="400"
                className=" text-sm mt-1 max-w-[250px] text-gray-500 text-center"
              >
                عذرًا، حدث خطأ غير متوقع. يرجى إعادة المحاولة. إذا استمرت
                المشكلة، يرجى الاتصال بفريق الدعم
              </Text>
              <TouchableOpacity
                className="bg-primary px-6 py-2 rounded mt-4"
                onPress={() => resetErrorBoundary()}
              >
                <Text className="text-base text-white">حاول مرة أخرى</Text>
              </TouchableOpacity>
            </View>
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
