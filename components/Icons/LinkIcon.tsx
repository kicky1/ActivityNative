import { cn } from "@/lib/cn";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

type LinkIconProps = {
    link: string,
    icon: any;
}

export function LinkIcon({ link, icon }: LinkIconProps) {
    return (
      <Link href={link} asChild>
        <Pressable className="opacity-80">
          {({ pressed }) => (
            <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
              {icon}
            </View>
          )}
        </Pressable>
      </Link>
    );
  }