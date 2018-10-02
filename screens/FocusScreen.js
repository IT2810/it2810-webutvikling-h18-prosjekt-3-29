import React from 'react';
import MapView from 'react-native-maps';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { IntentLauncherAndroid } from 'expo';

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
    region: {},
    startRegion: {},
    errorMessage: null,
    distance: null,
  };
  
  static navigationOptions = {
    title: 'Gløshaugen Focus',
  };
  
    componentWillMount() {
      if (Platform.OS === 'android') {
        this._checkProviderAsync();
      } 
      this._getLocationAsync();
    }
    
    componentDidMount() {
      let counter = 0
      console.log('Mounted!')
      this.watchId = Location.watchPositionAsync({
        enableHighAccuracy: true,
        distanceInterval: 2,
        timeInterval: 8000
      }, (location) => {
        if(location.timestamp){
          this.setState({region: {
            latitude:       location.coords.latitude,
            longitude:      location.coords.longitude,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5
        }})
        }
      })
    }

    componentWillUnmount() {
      Alert.alert('Component unmounting!')
      this.watchId.remove()
    }

    componentDidUpdate(prevState){
      if(prevState.region != this.state.region){
        let distanceFromTarget = getDistanceFromLatLonInKm(this.state.startRegion.latitude
          ,this.state.startRegion.longitude,
          this.state.region.latitude,
          this.state.region.longitude);
        if(distanceFromTarget >= 0.005){
          alert("No points!")
        }
      } else {
        console.log("adas")
      }
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

  /* Fetch current position using expo-api, set this position to state*/
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
    console.log(JSON.stringify(location.coords))
    this.setState({startRegion: {
        latitude:       location.coords.latitude,
        longitude:      location.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
    }})
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.startRegion}
          showsUserLocation={true}
          followUserLocation={true}>
         <MapView.Circle
          center={{
          latitude: 63.421164,
          longitude: 10.387444,
        }}
          radius={400}
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
