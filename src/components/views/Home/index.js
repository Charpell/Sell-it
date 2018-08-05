import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { navigatorDrawer, navigatorDeepLink } from "../../utils/misc";
import HorizontalScroll from "./horizontal_scroll_icons";

import { connect } from 'react-redux';
import { getArticles } from '../../Store/actions/articles_actions';
import { bindActionCreators } from 'redux';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      articles: [],
      categories: ["All", "Sports", "Music", "Clothing", "Electronics"],
      categorySelected: "All"
    };

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    });
  }

  updateCategoryHandler = value => {
    this.setState({
      isLoading: true,
      categorySelected: value,
      articles: []
    });
  };

  componentDidMount(){
    this.props.getArticles('All').then(()=>{
      console.log('List', this.props.Articles.list)
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScroll
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});


function mapStateToProps(state){
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);