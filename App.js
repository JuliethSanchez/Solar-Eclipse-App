import React, { Component } from 'react';
import {AppRegistry, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ListView, Dimensions, Image} from 'react-native';
import styles from './StylesTwo';
import {StackNavigator} from 'react-navigation';
import NavigationBar from 'react-native-navbar';
import MapView from 'react-native-maps';


const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA = ASPECT_RATIO

class HomeScreenFirst extends Component {
    render() {
      const { navigate } = this.props.navigation;
      let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
      return (
        <Image source={pic} style={{width: 193, height: 110}}/>
        );
        <View style={styles.container}>
          <TouchableOpacity
            style = {styles.welcomeButton}
            onPress = {() => navigate('HomeScreen')}>
            <Text style = {styles.homeText}>
              Welcome!
            </Text>
         </TouchableOpacity>
        </View>
    }
}
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Solar Eclipse AMNH'
  };
  constructor(props) {
    super(props); // calling the constructor of the parent. Super is the parent.
    this.state = {  // properties are used to comunicate between classes
      location: '',
      startTime: '',
      endTime: '',
  }
}
  handleLocation = (text) => {
      this.setState({ location: text });
  }

  handleStartTime = (text) => {
    this.setState({ startTime: text });
  }

  handleEndTime = (text) => {
    this.setState({ endTime: text});
  }

  clearInput(){
    return (
      this.setState({
        location: null,
        startTime: null,
        endTime: null
      })
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input}
          underlineColorAndroid = 'transparent'
          placeholder = 'Location'
          placeholdTextColor = '#9a73ef'
          autoCapitaize = 'none'
          onChangeText = {this.handleLocation}
          value = {this.state.location}
          />
        <TextInput style = {styles.input}
          underlineColorAndroid = 'transparent'
          placeholder = 'Start Time'
          placeholdTextColor = '#9a73ef'
          autoCapitaize = 'none'
          onChangeText = {this.handleStartTime}
          value = {this.state.startTime}/>
        <TextInput style = {styles.input}
          underlineColorAndroid = 'transparent'
          placeholder = 'End Time'
          placeholdTextColor = '#9a73ef'
          autoCapitaize = 'none'
          onChangeText = {this.handleEndTime}
          value = {this.state.endTime}/>
        <TouchableOpacity
          onPress = {() => navigate('Results', {Start: this.state.startTime, UserLocation: this.state.location, End: this.state.endTime})}>
          <Text style = {styles.submitButton}>
            Submit
          </Text>
         </TouchableOpacity>
        <TouchableOpacity
          style = {styles.geoButton}
          onPress = {() => navigate('MapScreen')}>
          <Text style = {styles.geoButtonText}>
            Geolocation
          </Text>
          </TouchableOpacity>
        <TouchableOpacity
           style = {styles.clearButton}
           onPress = {this.clearInput.bind(this)}>
          <Text style = {styles.clearButtonText}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //location: 'Nashville, TN',
      c2time : '18:27:03.9',
      c3time : '18:29:43.0',
      d_est : '373711.0"', //estimated distance from moon
      d_real : '372731.0', //actual distance from moon
      su_est : '36.16',
      su_real : '-86.78', //actual size of umbra
      lat : '0.26',
      long : '107.1',
      sun_alt : '166.5', //altitude of the sun (to correct size of umbra)
      percent_diff : '64.31'
  }
}
  static navigationOptions = ({navigation}) => ({
    title: 'Results'});
    render() {
      const {params} = this.props.navigation.state;
      const {param} = this.state;
      return (
      <View style ={{flex: 1, paddingTop: 20}}>
          <Text> For {params.UserLocation}, your latitude and longitude are {this.state.lat}, {this.state.long} degrees.
                The Suns altitude was {this.state.sun_alt} degrees at time {this.state.c2time} UTC.</Text>
          <Text> The estimated distance to the moon is {this.state.d_est}, which differs from
                the actual distance at that time {this.state.d_real} by {this.state.percent_diff}.
                This was estimated from your perceived umbra diameter of {this.state.su_est} km, though the actual
                umbra diameter should have been {this.state.su_real} km.</Text>
      </View>
      );
    }
  }
  /*

componentDidMount() {
  return fetch('https://brgup-public-001.amnh.org/eclipse/',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    location: this.props.navigation.state.UserLocation,
    startTime: this.props.navigation.state.Start,
    endTime: this.props.navigation.state.End,
  }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        location : responseData.UserLocation,
        c2time : responseData.c2time,
        c3time : responseData.c3time,
        d_est : responseData.d_est,
        d_real : responseData.d_real,
        su_est : responseData.su_est,
        su_real : responseData.su_real,
        lat : responseData.lat,
        long : responseData.long,
        sun_alt : responseData.sun_alt,
        percent_diff : responseData.percent_diff
      });
    })
    .catch((error) => {
      console.error(error);
});
}
}
*/
class mapsPractice extends React.Component {
  static navigationOptions = {
    title: 'Geolocation'
  };
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }
  watchID: ?number = null

   componentDidMount() {
     navigator.geolocation.getCurrentPosition((position) => {
       var lat = parseFloat(position.coords.latitude)
       var long = parseFloat(position.coords.longitude)

       var initialRegion = {
         latitude: lat,
         longitude: long,
         latitudeDelta: LATTITUDE_DELTA,
         longitudeDelta: LONGTITUDE_DELTA
       }

       this.setState({initialPosition: initialRegion})
       this.setState({markerPosition: initialRegion})
    },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var lastRegion = {
          latitude: lat,
          longitude: long,
          longitudeDelta: LONGTITUDE_DELTA,
          latitudeDelta: LATTITUDE_DELTA
        }

        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
      })
 }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styler.container}>
        <MapView
          style={styler.map}
          region={this.state.initialPosition}>

          <MapView.Marker
            coordinate={this.state.markerPosition}>
            <View style={styler.radius}>
              <View style={styler.marker}>
              </View>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}
const styler = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
const ComplicatedApp = StackNavigator({
  HomeScreenFirst: { screen: HomeScreenFirst},
  Home: {screen: HomeScreen},
  Results: { screen: ResultsScreen},
  MapScreen: {screen: mapsPractice}
});
export default ComplicatedApp;
