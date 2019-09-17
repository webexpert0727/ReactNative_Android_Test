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
    };

    this.image_data = [];
  }

  //CREATE ARRAY OF PHOTOS FOR SWIPE GALLERY
  componentWillMount() {
    this.setState({image_index: 1});
    for (let data of this.props.imagesArr) {
      let obj = {
        source: {
          uri: data.urls.thumb,
        },
        dimensions: {
          width: data.width,
          height: data.height,
        },
        thumbnail: data.urls.thumb,
        id: idGenerator(),
      };
      this.image_data.push(obj);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <GallerySwiper
          initialPage={this.state.image_index}
          images={this.image_data}
          onPageSelected={index => this.setState({image_index: index})}
          loadMinimal={true}
          loadMinimalSize={2}
        />
      </View>
    );
  }
}
