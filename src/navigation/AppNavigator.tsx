import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import PopularMoviesScreen from '../screens/PopularMoviesScreen';
import PostReviewScreen from '../screens/PostReviewScreen';
import SearchMoviesScreen from '../screens/SearchMoviesScreen';

/* build-ref:delta */
export type RootStackParamList = {
  HomeTabs: undefined;
  MovieDetails: {movieId: number};
  PostReview: {movieId: number; movieTitle: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeTabsProps = {
  openMovie: (movieId: number) => void;
};

const HomeTabs = ({openMovie}: HomeTabsProps) => {
  const [activeTab, setActiveTab] = useState<'popular' | 'search'>('popular');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'popular' ? (
          <PopularMoviesScreen onMoviePress={openMovie} />
        ) : (
          <SearchMoviesScreen onMoviePress={openMovie} />
        )}
      </View>

      <View style={styles.tabBar}>
        <Pressable
          onPress={() => setActiveTab('popular')}
          style={[styles.tab, activeTab === 'popular' && styles.tabActive]}>
          <Text
            style={[styles.tabText, activeTab === 'popular' && styles.tabTextActive]}>
            Popular
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('search')}
          style={[styles.tab, activeTab === 'search' && styles.tabActive]}>
          <Text
            style={[styles.tabText, activeTab === 'search' && styles.tabTextActive]}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerStyle: {backgroundColor: '#020617'},
        headerTintColor: '#f8fafc',
        contentStyle: {backgroundColor: '#0f172a'},
      }}>
      <Stack.Screen name="HomeTabs" options={{headerShown: false}}>
        {({navigation}) => (
          <HomeTabs
            openMovie={movieId => navigation.navigate('MovieDetails', {movieId})}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MovieDetails"
        options={{title: 'Movie details'}}>
        {({route, navigation}) => (
          <MovieDetailsScreen
            movieId={route.params.movieId}
            onWriteReview={(movieId, movieTitle) =>
              navigation.navigate('PostReview', {movieId, movieTitle})
            }
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="PostReview" options={{title: 'Write review'}}>
        {({route, navigation}) => (
          <PostReviewScreen
            movieId={route.params.movieId}
            movieTitle={route.params.movieTitle}
            onDone={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    color: '#94a3b8',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#eff6ff',
  },
});

export default AppNavigator;
