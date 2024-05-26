import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.project.readex',
  appName: 'read-ex',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
