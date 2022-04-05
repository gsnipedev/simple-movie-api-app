import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking, Button} from 'react-native';

class ImageCategory extends Component {
  render() {
    return (
      <View
        style={{
          marginLeft: 44,
          marginRight: this.props.mRight,
          borderWidth: 1,
        }}>
        <Image
          source={{
            width: 150,
            height: 120,
            uri: this.props.imageUri,
          }}
        />
        <View style={{marginTop: 10}}>
          <Text style={{fontWeight: 'bold', marginHorizontal: 10}}>
            {this.props.descText}
          </Text>
        </View>
      </View>
    );
  }
}

class FilmCard extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Image
          source={{uri: this.props.imgUri, height: 200, width: 150}}
          resizeMode="cover"
        />
        <Text>{this.props.filmTitle}</Text>
        <Text>{this.props.filmYear}</Text>
        <Button
          title="Tonton sekarang"
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/search?q=${this.props.filmTitle}`,
            )
          }></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    width: 150,
    height: 200,
    backgroundColor: 'blue',
    margin: 15,
  },
});

export {ImageCategory, FilmCard};
