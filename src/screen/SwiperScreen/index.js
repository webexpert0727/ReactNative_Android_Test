import React, {Component} from 'react';
import {View} from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';

//FUNCTION FOR GENERATING RANDOM IDs
function idGenerator() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_index: 0,
      image_data: [],
    };
  }

  //CREATE ARRAY OF PHOTOS FOR SWIPE GALLERY
  componentDidMount() {
    // this.setState({image_index: 1});
    let imageArray = [];
    for (let data of this.props.imagesArr) {
      let obj = {
        source: {
          uri: data.urls.regular,
        },
        dimensions: {
          width: data.width,
          height: data.height,
        },
        thumbnail: data.urls.regular,
        id: idGenerator(),
      };
      imageArray.push(obj);
    }
    this.setState({image_data: imageArray});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.image_data.length > 10 && (
          <GallerySwiper
            initialPage={this.props.index}
            images={this.state.image_data}
            onPageSelected={index => this.setState({image_index: index})}
            loadMinimal={true}
            initialNumToRender={this.state.image_data.length}
          />
        )}
      </View>
    );
  }
}
