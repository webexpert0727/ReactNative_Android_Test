import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {toJson} from 'unsplash-js/native';
import {unsplash} from '../../constants';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      loading: false,
      images: [],
    };
    this.arrayholder = [];
  }

  //API CALL TO SEARCH USER USING SEARCH BAR
  componentDidMount() {
    this.setState({loading: true});
    unsplash.search
      .users('a', 1, 50)
      .then(toJson)
      .then(data => {
        this.setState({images: data.results, loading: false});
      });
  }

  //ONCHANGE FUNCTION TO PERFORM SEARCH
  onChangeText(text) {
    this.setState({searchValue: text, loading: true}, () => {
      this.performSearch(this.state.searchValue);
    });
  }

  //API CALL WITH SEARCH PARAMETER(ENTERED BY USER)
  performSearch = text => {
    if (text === '') {
      text = 'a';
    }
    unsplash.search
      .users(text, 1, 10)
      .then(toJson)
      .then(data => {
        this.setState({images: data.results, loading: false});
      });
  };

  render() {
    const {images} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchButton}>
          <TextInput
            style={styles.inputText}
            placeholder="Search..."
            onChangeText={text => this.onChangeText(text)}
            autoCorrect={false}
            value={this.state.searchValue}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator size="large" animating={true} />
        ) : null}

        {images.length <= 0 && !this.state.loading ? (
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              No User Found
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginHorizontal: 5}}
            data={images}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.list_item}
                onPress={() => Actions.detail({item: item})}>
                <View>
                  <Image
                    source={{uri: item.profile_image.large}}
                    style={styles.imageUser}
                  />
                </View>
                <View style={{flexDirection: 'row', padding: 20}}>
                  <Text style={styles.username}>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    elevation: 4,
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputText: {
    paddingLeft: 20,
    width: '100%',
  },
  searchButton: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
    borderRadius: 4,
    backgroundColor: 'white',
    elevation: 8,
  },
});
