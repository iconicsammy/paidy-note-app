import Toast from 'react-native-root-toast';

const Toaster = {
    show(message: string){
        Toast.show(message, {
            duration: Toast.durations.LONG
        })
    }
}

export default Toaster;