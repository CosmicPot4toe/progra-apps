import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'progra-apps2',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
,
    android: {
       buildOptions: {
          keystorePath: 'c:\Users\jifig\Documents\GitHub\progra-apps\RegistrAPP.keystore.jks',
          keystoreAlias: 'RegistrAPP',
       }
    }
  };

export default config;
