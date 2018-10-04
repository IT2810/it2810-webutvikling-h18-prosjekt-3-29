import React from 'react';
import MapView from 'react-native-maps';
import { Platform, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { IntentLauncherAndroid } from 'expo';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import MapStyle from './mapStyle.json';


/* Common implementation of Haversine Formula */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default class FocusScreen extends React.Component {
  state = {
    focusPoints: "",
    region: {},
    validLat: 63.4156144, //A-blokka på Gløshaugen
    validLong: 10.4045326, //A-blokka på Gløshaugen
    errorMessage: null,
  };
  
  //Set Title on Page
  static navigationOptions = {
    title: 'Gløshaugen Focuss',
  };

  //If Android device, ask for LocationService permissions, anyhow -> fetch current location
  componentWillMount() {
    if (Platform.OS === 'android') {
      this._checkProviderAsync();
    } 
    this._getLocationAsync();
  }

  //Check location every minute to make sure user is within parameters
  componentDidMount(){
    this._getFocusPointsAsync();
    this.interval = setInterval(() => {
      this._getLocationAsync();
    }, 10000);
  }

    /* For Android 6. we need to specifically override LocationServices at first launch 
    /* due to incompatibility between expo.cli and Android SDK
    */
  _checkProviderAsync = async () => {
    let {status } = await Expo.Location.getProviderStatusAsync();
    if(status.locationServicesEnabled === 'false' || status.gpsAvailable === 'false'){
        IntentLauncherAndroid.startActivityAsync(
          IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
        ); 
    } 
  };

  _saveFocusPointsAsync = async (value) => {
    let points = String(this.state.focusPoints + 1)
      try {
        await AsyncStorage.setItem('focusPoints', points);
        this.setState({focusPoints : parseInt(points)})
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    _getFocusPointsAsync = async () => {
      try {
        let focusPointsFetched = await AsyncStorage.getItem('focusPoints');
       if (focusPointsFetched == null) {
        this.setState({focusPoints : 0})
       }
       else {
        focusPointsFetched = parseInt(focusPointsFetched)
         this.setState({focusPoints : focusPointsFetched})
       }
     } catch (error) {
       // Error retrieving data
       console.log(error.message);
     }
    }

  /* Fetch current position using expo-api, set this position to state
  /* Calculate distance from current location to known valid location, 
  /* if distance is too large -> dont give points (dont save)
  */
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted'){
      console.log("Permission granted")
    }
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    let currentLat = location.coords.latitude;
    let currentLong = location.coords.longitude;
    let distanceNow = getDistanceFromLatLonInKm(currentLat,
      currentLong,
      this.state.validLat,
      this.state.validLong)

    if(distanceNow >= 0.05){
      alert("You are not at Gløshuagen, get back there and study!")
    } else {
      this._saveFocusPointsAsync();
      console.log("From async: " + this._getFocusPointsAsync());
      console.log("From state: "  + this.state.focusPoints)
    }

    this.setState({region: {
      latitude:       currentLat,
      longitude:      currentLong,
      latitudeDelta:  0.00922*1.6, //Zoom level
      longitudeDelta: 0.00421*1.6, //Zoom level
    }})  
    console.log("Current position" + JSON.stringify(location.coords))
  };

  render() {
    /* If one wants conditional styles on map based on OS */
    let mapStylePlatform = "";
    if (Platform.OS === 'android') {
      mapStylePlatform = MapStyle;
    } else {
      mapStylePlatform = MapStyle;
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStylePlatform}
          region={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}>
         <MapView.Circle
          center={{
          latitude: this.state.validLat,
          longitude: this.state.validLong,
        }}
          radius={100}
          strokeWidth={2}
          strokeColor="#3399ff"
          fillColor="rgba(227,210,210,0.5)"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});
