import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Pressable, Alert, ButtonProps, TouchableOpacity, Platform, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Text } from '@/components/nativewindui/Text';
import { DefaultButton } from '@/components/Buttons/DefaultButton';

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err.errors[0].message);
      switch (err.errors[0].message) {
        case 'Identifier is invalid.':
          err.errors[0].message = 'Nieprawidłowe dane użytkownika.';
          break;
        case 'Enter password.':
          err.errors[0].message = 'Wprowadź hasło.';
          break;
        default:
          break;
      }

      if (Platform.OS === 'ios') {
        Alert.prompt(
        'Wystąpił błąd podczas logowania',
        err.errors[0].message,
        [
          {
          text: 'Zamknij',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
          },
        ],
        'secure-text',
        '',
        'default'
        );
      } else {
        Alert.alert('Wystąpił błąd podczas logowania', err.errors[0].message, [
        {
          text: 'Zamknij',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <View className="flex-1 items-center pt-20 px-12 gap-1">
      <Image source={require('../../assets/pgk_logo.jpg')} className='mb-10 mt-0 rounded-2xl'/>
      <Spinner visible={loading} />

      <TextInput 
        autoCapitalize="none" 
        placeholder="email@gmail.com" 
        value={emailAddress} 
        onChangeText={setEmailAddress}
        className='w-full p-2 pl-4 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'  
      />
      <TextInput 
        placeholder="********" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry  
        className='w-full p-2 pl-4 mt-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'  
      />

      <DefaultButton onSignInPress={onSignInPress} text='Zaloguj' />

      <Link href="/reset" asChild>
        <Pressable >
          <Text className='pt-6'>Zapomniałeś hasła?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable>
          <Text>Stwórz konto</Text>
        </Pressable>
      </Link>
    </View>
    </>
  );
};

export default Login;