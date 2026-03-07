import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';

// Workaround for Jest "ReferenceError: You are trying to import a file outside of the scope of the test code."
// caused by Expo's WinterCG polyfills using getters that get triggered during Jest teardown.
const winterGlobals = [
  '__ExpoImportMetaRegistry',
  'TextEncoderStream',
  'TextDecoderStream',
  'TextDecoder',
  'URL',
  'URLSearchParams',
  'structuredClone',
];
winterGlobals.forEach((key) => {
  const descriptor = Object.getOwnPropertyDescriptor(global, key);
  if (descriptor && descriptor.enumerable) {
    Object.defineProperty(global, key, { ...descriptor, enumerable: false });
  }
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

require('react-native-reanimated').setUpTests();
