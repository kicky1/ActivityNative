import { ActivityIndicator, View, useWindowDimensions } from 'react-native';

const StartPage = () => {
  return (
    <View  className="flex-1 items-center justify-center gap-1 px-12">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default StartPage;