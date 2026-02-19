import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

/* build-ref:delta */
type Props = {
  movieId: number;
  movieTitle: string;
  onDone: () => void;
};

const PostReviewScreen = ({movieId, movieTitle, onDone}: Props) => {
  const [author, setAuthor] = useState('');
  const [review, setReview] = useState('');

  const disabled = useMemo(
    () => !author.trim() || review.trim().length < 20,
    [author, review],
  );

  const submit = () => {
    Alert.alert(
      'Review submitted',
      `Your review for ${movieTitle} (ID: ${movieId}) was saved locally.`,
    );
    onDone();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Post a review</Text>
        <Text style={styles.subtitle}>{movieTitle}</Text>

        <TextInput
          value={author}
          onChangeText={setAuthor}
          placeholder="Your name"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          value={review}
          onChangeText={setReview}
          placeholder="Write at least 20 characters"
          placeholderTextColor="#94a3b8"
          style={[styles.input, styles.multiline]}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Pressable
          disabled={disabled}
          onPress={submit}
          style={[styles.button, disabled && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>Submit review</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    color: '#cbd5e1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f8fafc',
    backgroundColor: '#1e293b',
    marginBottom: 12,
  },
  multiline: {
    minHeight: 140,
  },
  button: {
    marginTop: 4,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#eff6ff',
    fontWeight: '700',
  },
});

export default PostReviewScreen;
