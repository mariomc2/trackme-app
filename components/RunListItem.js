import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';


export default function RunListItem({
  id, run_id, title, start, distance, duration, onPress,
}) {
  return (
    <TouchableHighlight
      underlayColor='gainsboro'
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.runInfo}>

        <View style={[styles.avatar,
                    {backgroundColor: "rgb("+ Math.floor(Math.random()*256) + "," +
                          Math.floor(Math.random()*256) + "," +
                          Math.floor(Math.random()*256) + ")"
                    }
        ]} >
          <Text style={styles.distance}>{distance + ' '}</Text>
        </View>

        <View style={styles.details}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={styles.subtitle}>{moment(start).format('dddd, MMMM Do YYYY')}</Text>
          <Text style={styles.subtitle}>{moment(start).format('h:mm a')}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

RunListItem.propTypes = {
  id: PropTypes.string.isRequired,
  run_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  runInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: 'gainsboro',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    borderRadius: 32,
    width: 75,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distance: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: 'dodgerblue',
    fontSize: 15,
    marginTop: 4,
  },
});
