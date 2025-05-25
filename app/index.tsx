import AuthModal from '@/components/AuthModal';
import { Colors } from '@/constants/Colors';
import { ModalType } from '@/types/enums';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  // useSafeAreaInsets is a hook that returns the insets of the safe area
  // on the device. This is useful for avoiding the notch on iPhones and
  // the status bar on Android devices.
  // It returns an object with the following properties: top, bottom, left, right
  // The values are in pixels and are positive numbers.
  const { top } = useSafeAreaInsets();

  const { showActionSheetWithOptions } = useActionSheet();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);



  const openLink = async () => {
    WebBrowser.openBrowserAsync('https://www.google.com');
  };

  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `Can't log in or sign up?`,
      },
      (selectedIndex: any) => {
        switch (selectedIndex) {
          case 1:
            // Support
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };


  const showModal = async (type: ModalType) => {
    // This function is used to show the modal for login or signup
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  }


    const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>

      <View 
        style={[
          styles.container, 
          { 
            paddingTop: top + 30,
          }]}>
        <Image source={require('@/assets/images/login/trello.png')} style={styles.image} />
        <Text style={styles.introText}>Move teamwork forward - even on the go</Text>

        {/* Bottom container */}
        <View style={styles.bottomContainer}>

          {/* Log in button */}
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#fff'} ]}
            onPress={() => showModal(ModalType.Login)}>
            <Text style={[styles.btnText, { color: Colors.primary }]}>Log In</Text>
          </TouchableOpacity>

          {/* Sign up button */}
          <TouchableOpacity style={[styles.btn]} onPress={() => showModal(ModalType.SignUp)}>
            <Text style={[styles.btnText, { color: '#fff' }]}>Sign Up</Text>
          </TouchableOpacity>

          {/* User Notice & Privacy Policy */}
          <Text style={styles.description}>
            By signing up, you agree to the{' '}
            <Text style={styles.link} onPress={openLink}>
              User Notice
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
            .
          </Text>

          {/* Can't log in? */}
          <Text style={styles.link} onPress={openActionSheet}>
            Can't log in our sign up?
          </Text>

        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        enableOverDrag={false}
        enablePanDownToClose>
        <AuthModal authType={authType} />
      </BottomSheetModal>

    </BottomSheetModalProvider>

  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: 'center',
    },
    image: {
      height: 450,
      paddingHorizontal: 40,
      resizeMode: 'contain',
    },
    introText: {
      fontWeight: '600',
      color: 'white',
      fontSize: 17,
      padding: 30,
    },
    bottomContainer: {
      gap: 10,
      width: '100%',
      paddingHorizontal: 40,
    },
    btn: {
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      borderColor: '#fff',
      borderWidth: 1,
    },
    btnText: {
      fontSize: 18,
    },
    description: {
      fontSize: 12,
      textAlign: 'center',
      color: '#fff',
      marginHorizontal: 60,
    },
    link: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
});
