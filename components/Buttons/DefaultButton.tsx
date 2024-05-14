import { TouchableOpacity } from "react-native";
import { Text } from "../nativewindui/Text";

type Props = {
  onSignInPress: () => void;
  text: string
};

export function DefaultButton({onSignInPress, text}: Props) {

  return(
  <TouchableOpacity
  activeOpacity={0.7}
  onPress={onSignInPress}
  className='bg-slate-900 p-3 mt-6 rounded-lg w-full items-center justify-center'
>
  <Text className='text-white'>{text}</Text>
</TouchableOpacity>)
}