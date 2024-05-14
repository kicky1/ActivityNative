import { Button, TextInput, View, StyleSheet, Platform, Alert, ToastAndroid } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { DefaultButton } from '@/components/Buttons/DefaultButton';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const correctRegister = useRef(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setTimeout(() => {
        showToaster('Wysłano kod na email. Wprowadź go w przeciągu minuty!');
      }, 500);

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      console.log(err.errors[0].message);
      switch (err.errors[0].message) {
        case 'Enter email address.':
          err.errors[0].message = 'Wprowadź adres email.';
          break;
        case 'is invalid':
          err.errors[0].message = 'Nieprawidłowy adres email.';
          break;
        case 'Enter password.':
          err.errors[0].message = 'Wprowadź hasło.';
          break;
        case 'Password must be 8 characters or more.':
          err.errors[0].message = 'Hasło musi mieć co najmniej 8 znaków.';
          break;
        case 'Password has been found in an online data breach. For account safety, please use a different password.':
          err.errors[0].message = 'Hasło zostało znalezione w wycieku danych online. Dla bezpieczeństwa konta użyj innego hasła.';
          break;
         case 'That email address is taken. Please try another.':
          err.errors[0].message = 'Ten adres email jest zajęty. Proszę spróbuj inny.';
          break; 
        default:
          break;
      }

      if (Platform.OS === 'ios') {
        Alert.prompt(
        'Wystąpił błąd podczas rejestracji',
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
        Alert.alert('Wystąpił błąd podczas rejestracji', err.errors[0].message, [
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

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      switch (err.errors[0].message) {
        case 'is incorrect':
          err.errors[0].message = 'Nieprawidłowy kod.';
          break;

      }

      if (Platform.OS === 'ios') {
        Alert.prompt(
        'Wystąpił błąd podczas weryfikacji',
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
        Alert.alert('Wystąpił błąd podczas weryfikacji', err.errors[0].message, [
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

  const showToaster = (message: string) => {
      ToastAndroid.show(message, ToastAndroid.LONG);
    }

   
  return (
    <View className="flex-1 items-center justify-center  px-12 gap-1">
      <Stack.Screen options={{ headerBackVisible: true}} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
    <TextInput 
        autoCapitalize="none" 
        placeholder="email@gmail.com" 
        value={emailAddress} 
        onChangeText={setEmailAddress}
        className='w-full p-2 pl-4 border-2 bg-white border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'  
      />
                <TextInput 
        placeholder="********" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry  
        className='w-full p-2 pl-4 mt-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'  
      />
          <DefaultButton onSignInPress={onSignUpPress} text='Zatwierdź' />
        </>
      )}

      {pendingVerification && (
        <>
          
            <TextInput value={code} placeholder="Wprowadź kod"  onChangeText={setCode}          className='w-full p-2 pl-4 mt-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'  
/>
          
        
          <DefaultButton onSignInPress={onPressVerify} text='Weryfikacja email' />
        </>
      )}
    </View>
  );
};

export default Register;