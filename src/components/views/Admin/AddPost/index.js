import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { navigatorDrawer } from '../../../utils/misc';

class AddPost extends React.Component {
  constructor(props){
    super(props);

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDrawer(event, this)
    })
  } 

  render() {
    return (
      <Text>Add post</Text>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddPost;
