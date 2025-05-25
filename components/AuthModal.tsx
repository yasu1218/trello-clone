import { AuthStrategy, ModalType } from '@/types/enums';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';


// Login options for the authentication modal
const LOGIN_OPTIONS = [
  {
    text: 'Continue with Google',
    icon: require('@/assets/images/login/google.png'),
    strategy: AuthStrategy.Google,
  },
  {
    text: 'Continue with Microsoft',
    icon: require('@/assets/images/login/microsoft.png'),
    strategy: AuthStrategy.Microsoft,
  },
  {
    text: 'Continue with Apple',
    icon: require('@/assets/images/login/apple.png'),
    strategy: AuthStrategy.Apple,
  },
  {
    text: 'Continue with Slack',
    icon: require('@/assets/images/login/slack.png'),
    strategy: AuthStrategy.Slack,
  },
];


interface AuthModalProps {
  authType: ModalType | null;
}

const AuthModal = ({ authType }: AuthModalProps) => {

  const onSelectAuth = async (strategy: AuthStrategy) => {
    // This function is used to handle the selected auth strategy
    // For example, if the user selects Google, you can call the Google auth function
    console.log(strategy);
    // TODO: Clerk auth
  };

  return (
      <BottomSheetView style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBtn}>
          <Ionicons name="mail-outline" size={20} />
          <Text style={styles.btnText}>
            {authType === ModalType.Login ? 'Login' : 'Sign Up'} with Email
          </Text>
        </TouchableOpacity>
        {LOGIN_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.modalBtn}
            onPress={() => onSelectAuth(option.strategy!)}>
            <Image source={option.icon} style={styles.btnIcon} />
            <Text style={styles.btnText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheetView>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    gap: 20,
  },
  modalBtn: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  btnIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  btnText: {
    fontSize: 18,
  },
});



export default AuthModal;
