import { AppEnv, appConfig } from 'constant';
import * as firebase from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const getEnvConfig = (env: string) => {
  let config = appConfig.PROD;
  switch (env) {
    case AppEnv.Dev:
      config = appConfig.DEV;
      break;
    case AppEnv.Staging:
      config = appConfig.STAGING;
      break;
  }
  return config;
};

const firebaseConfig = getEnvConfig(import.meta.env.VITE_APP_ENV);

const app = firebase.initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

//TODO: will return access token from function when integrating login api for custom token
const getFirebaseToken = async (token: string) => {
  let isSuccessfulLogin = false;
  if (!token) {
    alert('Please Enter Valid Token');
    return false;
  }
  try {
    const userResult = await signInWithCustomToken(firebaseAuth, token);
    if (userResult) {
      isSuccessfulLogin = true;
    }
    return isSuccessfulLogin;
  } catch (error) {
    alert(error);
    return isSuccessfulLogin;
  }
};

export default app;
export { firebaseAuth, getFirebaseToken };
