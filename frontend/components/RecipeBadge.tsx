import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type Props = {
  imageUrl: string | null;
  size?: number;
};

export function RecipeBadge({ imageUrl, size = 32 }: Props) {
  const style = { width: size, height: size, borderRadius: size / 2 };

  if (imageUrl) {
    return <Image source={{ uri: imageUrl }} style={[styles.badge, style]} />;
  }
  return <View style={[styles.badge, styles.placeholder, style]} />;
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  placeholder: {
    backgroundColor: '#d0d0d0',
  },
});
