import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

/* build-ref:delta */
const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Image
          source={{uri: 'https://i.pravatar.cc/200?img=12'}}
          style={styles.avatar}
        />
        <Text style={styles.name}>Alex Reviewer</Text>
        <Text style={styles.email}>alex.reviewer@example.com</Text>

        <View style={styles.row}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>54</Text>
            <Text style={styles.statLabel}>Watchlist</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.7</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 10,
  },
  name: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 22,
  },
  email: {
    color: '#cbd5e1',
    marginTop: 4,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
});

export default ProfileScreen;
