// Loads mocks for react-native maps on launch of jest process,
jest.mock('react-native-maps', () => 'AirGoogleMaps');
jest.mock('react-native-maps', () => "MapView");