/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RNS3 } from "react-native-aws3";

import Camera from "react-native-camera";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.view}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE_IMAGE]
          </Text>
        </Camera>
      </View>
    );
  }

  TakePictureEveryFiveSeconds() {
    setInterval(() => {
      const options = {};
      this.camera
        .capture({ metadata: options })
        .then(data => {
          const file = {
            uri: data.path,
            name: "photo.jpg",
            type: "image/jpeg"
          };

          const options = {
            keyPrefix: "YOUR FOLDER NAME/",
            bucket: "YOUR BUCKET NAME",
            region: "YOUR REGION",
            accessKey: "YOUR ACCESS KEY",
            secretKey: "YOUR SECRET NAME",
            successActionStatus: 201
          };
          RNS3.put(file, options).then(response => {
            if (response.status !== 201) {
              console.log("response: ", response);
              throw new Error("Failed to upload image to S3", response);
            }
            console.log("*** BODY ***", response.body);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, 5000);
  }

  takePicture() {
    const options = {};
    this.camera
      .capture({ metadata: options })
      .then(data => {
        const file = {
          uri: data.path,
          name: "photo.jpg",
          type: "image/jpeg"
        };
        const options = {
          keyPrefix: "YOUR FOLDER NAME/",
          bucket: "YOUR BUCKET NAME",
          region: "YOUR REGION",
          accessKey: "YOUR ACCESS KEY",
          secretKey: "YOUR SECRET NAME",
          successActionStatus: 201
        };
        RNS3.put(file, options).then(response => {
          if (response.status !== 201) {
            console.log("response: ", response);
            throw new Error("Failed to upload image to S3", response);
          }
          console.log("*** BODY ***", response.body);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "steelblue",
    borderRadius: 10,
    color: "red",
    padding: 15,
    margin: 45
  }
});
