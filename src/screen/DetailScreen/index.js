import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {toJson} from 'unsplash-js/native';
import {Actions} from 'react-native-router-flux';
import {unsplash} from '../../constants';

let width = Dimensions.get('screen').width / 2 - 14;

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GalleryItemArray: [],
    };
  }

  //TO GET USERS PHOTOS BY USER NAME
  componentDidMount = () => {
    unsplash.users
      .photos(this.props.item.username, 1, 100)
      .then(toJson)
      .then(json => {
        console.log(json);
        this.setState({GalleryItemArray: json});
      });
  };

  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer}>
            <Image
              source={{uri: item.profile_image.large}}
              style={styles.imageUser}
            />
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              {item.username}
            </Text>
          </View>
          <View>
            {this.state.GalleryItemArray.length <= 0 && !this.state.loading ? (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 20,
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  No Photo Found
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.GalleryItemArray}
                extraData={this.state}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() =>
                      Actions.swiper({
                        item: item,
                        index: index,
                        imagesArr: this.state.GalleryItemArray,
                      })
                    }>
                    <Image
                      source={{uri: item.urls.thumb}}
                      style={[styles.btnContainer]}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item.id}
                numColumns={2}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  btnContainer: {
    width: width,
    height: width - 4,
    margin: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
