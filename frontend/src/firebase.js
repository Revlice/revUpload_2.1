import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,signInWithPopup, GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from "firebase/auth";
import toast from 'react-hot-toast';
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyDK9d8kAg5e_0pu33V27dGxrFcwDSKPSaU",
    authDomain: "revupload-4e229.firebaseapp.com",
    projectId: "revupload-4e229",
    storageBucket: "revupload-4e229.appspot.com",
    messagingSenderId: "533117016291",
    appId: "1:533117016291:web:9de4dbcb9e87aad9360dd6",
    measurementId: "G-QXPTWDHVSV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const storage = getStorage(app);

export {storage};







export const register = async (email, password) => {
    try{
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    }catch(error){
        toast.error(error.message);
    }
};

export const login = async (email, password) => {
    try{
      const {user} = await  signInWithEmailAndPassword(auth,email, password);
      return user;
    }catch(error){
        console.log(error);

        if (error.code === 'auth/too-many-requests') {
            toast.error('Çok fazla giriş yaptınız, lütfen daha sonra tekrar deneyin');
        }

    }
};


export const logout = async () => {
    try{
        await signOut(auth);
        return true;

    }catch(error){
        toast.error(error.message);
        toast.error(error.code);
    }
};

export const google= async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        throw error;
    }
};

export const github = async () => {
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        console.error("GitHub ile giriş yaparken hata oluştu:", error);
        throw error;
    }
};

export const facebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        console.error("Facebook ile giriş yaparken hata oluştu:", error);
        throw error;
    }
};


export const checkIfEmailExists = async (email) => {
    try {
        const result = await auth.fetchSignInMethodsForEmail(email);

        return result.signInMethods && result.signInMethods.length > 0;
    } catch (error) {
        console.error('E-posta kontrolü sırasında bir hata oluştu:', error);
        throw error;
    }
};
export default app;


