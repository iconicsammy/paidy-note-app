
import React from "react";
import LoginScreen from "./LoginScreen";
import LocalAuth, { AuthDeviceFeatures, AuthResult } from 'application/auth/LocalAuth';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import Toaster from 'utils/Toaster'
import GlobalConstants from "config/GlobalConstants";


describe("Login Screen", () =>{
    jest.useFakeTimers();

    let spyGetSupportedAuthenticationFeatures: any;
    let spyAuthenticate: any;
    let spyToasterShow: any;

    beforeEach(()=>{
        spyGetSupportedAuthenticationFeatures = jest.spyOn(LocalAuth, "getSupportedAuthenticationFeatures");
        spyAuthenticate = jest.spyOn(LocalAuth, "authenicate");
        spyToasterShow = jest.spyOn(Toaster, "show");
    })

    afterEach(()=>{
        jest.restoreAllMocks();
    })

    it("renders correctly", async () => {
        const features: AuthDeviceFeatures = {
            fingerPrint: true,
            iris: true,
            facialRecogniation: true
        }
        spyGetSupportedAuthenticationFeatures.mockResolvedValue(features);

        const snapShotTree = await render(<LoginScreen />).toJSON();
        await act(async () => {
            expect(snapShotTree).toMatchSnapshot();
          });
      
      });

    it("should warn user device doesnt have auth features", async () =>{
        const features: AuthDeviceFeatures = {
            fingerPrint: false,
            iris: false,
            facialRecogniation: false
        }
        spyGetSupportedAuthenticationFeatures.mockResolvedValue(features);

        const { getByTestId } = render(<LoginScreen />);
        await act(async () => {
            expect(() => getByTestId('txtWarn').not.toThrow(`No instances found`));
            expect(() => getByTestId('btnAuth').toThrow(`No instances found`));
          });
      
    })


    it("should handle authentication failure", async () =>{
        const features: AuthDeviceFeatures = {
            fingerPrint: true,
            iris: false,
            facialRecogniation: false
        }
        const authResult: AuthResult = {
            success : false
        }
        spyGetSupportedAuthenticationFeatures.mockResolvedValue(features);
        spyAuthenticate.mockResolvedValue(authResult)

        const { findByTestId, getByText } = render(<LoginScreen />);
        const btnAuth = await findByTestId("btnAuth")

        await act(async () => {
            fireEvent.press(btnAuth);
          });
   
        expect(spyToasterShow).toHaveBeenCalledWith(GlobalConstants.AUTH_FAILED)
      
    })

})