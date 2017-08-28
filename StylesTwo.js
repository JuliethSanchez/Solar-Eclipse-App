import React, {PropTypes, Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from 'expo';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },

  input: {
    margin: 15,
    height: 40,
    borderColor: '#7fffd4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#e0ffff',
    padding: 10,
    margin: 15,
    height: 40
  },
  welcomeButton: {
    backgroundColor: '#000000',
    padding: 10,
    margin: 15,
    height: 40
  },
  geoButton: {
    backgroundColor: '#e0ffff',
    padding: 10,
    margin: 15,
    height: 40
  },
  clearButton: {
    backgroundColor: '#e0ffff',
    padding: 10,
    margin: 15,
    height: 40
  },
  clearButtonText: {
    color: 'black'
  },
  submitButtonText:{
    color: 'black'
  },
  geoButtonText:{
    color: 'black'
  },
  homeText: {
    color: 'black'
  }
});
export default styles
