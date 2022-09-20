/*

  Exposes local authentication features (which depends on device)
*/

import Logger from 'application/Analytics/Logger';
import * as LocalAuthentication from 'expo-local-authentication';


export enum AuthStatus {
  CANCELLED = 'CANCELLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface AuthDeviceFeatures {
  fingerPrint: boolean;
  facialRecogniation: boolean;
  iris: boolean;
}

export interface AuthResult {
  success?: boolean
  error?: string

}

class LocalAuth {

  private static instance : LocalAuth;

  constructor(){
    if (!LocalAuth.instance){
      LocalAuth.instance = this;
    }
    return LocalAuth.instance
  }

  private authDeviceFeatures: AuthDeviceFeatures = {
    fingerPrint: false,
    facialRecogniation: false,
    iris: false
  }


   getSupportedAuthenticationFeatures = async (): Promise<AuthDeviceFeatures> => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      this.authDeviceFeatures.facialRecogniation = types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION);
      this.authDeviceFeatures.fingerPrint =types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      this.authDeviceFeatures.iris = types.includes(LocalAuthentication.AuthenticationType.IRIS);
    }
    return this.authDeviceFeatures;
  };

  authenicate = async () : Promise<AuthResult> => {

      try {
        const results: AuthResult = await LocalAuthentication.authenticateAsync();
        return results;
      } catch (error) {
        Logger.logError(error);
        throw error;
      }
  }


}

export default new LocalAuth();