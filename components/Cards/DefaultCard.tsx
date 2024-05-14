import { View } from "react-native";
import { Text } from "../nativewindui/Text";


type DefaultCardProps = { 
    children: React.ReactNode; 
    title: string 
};

export function DefaultCard({ children, title }: DefaultCardProps) {
    return (
      <View className="px-4 mt-4">
        <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
          <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
          {children}
        </View>
      </View>
    );
  }