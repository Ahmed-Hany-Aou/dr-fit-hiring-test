import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { fetchRecipe, Recipe, Ingredient } from '../api/recipes';

type Props = {
  recipeId: number;
  onBack: () => void;
};

export function RecipeDetail({ recipeId, onBack }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRecipe(recipeId)
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || String(e));
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Fetching recipe secrets...</Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorHeader}>Oops!</Text>
        <Text style={styles.errorText}>{error || 'Recipe not found'}</Text>
        <TouchableOpacity style={styles.backButtonInline} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.backButtonTextInline}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Helper to render ingredients safely
  const renderIngredientsList = (ingredients: Ingredient[] | string) => {
    if (typeof ingredients === 'string') {
      return ingredients.split(',').map((item, idx) => (
        <View key={idx} style={styles.ingredientRow}>
          <Text style={styles.bullet}>✦</Text>
          <Text style={styles.ingredientTextString}>{item.trim()}</Text>
        </View>
      ));
    }

    if (Array.isArray(ingredients)) {
      return ingredients.map((ing, idx) => (
        <View key={idx} style={styles.ingredientRow}>
          <Text style={styles.bullet}>✦</Text>
          <Text style={styles.ingredientName}>{ing.name}</Text>
          <View style={styles.quantityBadge}>
            <Text style={styles.quantityText}>
              {ing.weight} {ing.unit}
            </Text>
          </View>
        </View>
      ));
    }

    return null;
  };

  const hasImage = recipe.image && recipe.image.trim() !== '';

  return (
    <View style={styles.container}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Recipes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover Image / Placeholder */}
        {hasImage ? (
          <Image source={{ uri: recipe.image! }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderIcon}>🍲</Text>
            <Text style={styles.placeholderLabel}>Dr.Fit Healthy Choice</Text>
          </View>
        )}

        {/* Recipe Body */}
        <View style={styles.body}>
          <Text style={styles.title}>{recipe.title}</Text>

          {/* Quick Info Bar */}
          <View style={styles.infoBar}>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>⏱️</Text>
              <View>
                <Text style={styles.infoLabel}>PREP TIME</Text>
                <Text style={styles.infoValue}>{recipe.prep_time} mins</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>🥗</Text>
              <View>
                <Text style={styles.infoLabel}>DIET TYPE</Text>
                <Text style={styles.infoValue}>Healthy</Text>
              </View>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.ingredientsContainer}>
            <Text style={styles.sectionTitle}>Ingredients Checklist</Text>
            <Text style={styles.sectionSubtitle}>
              Tap ingredients to check them off as you cook.
            </Text>
            <View style={styles.ingredientsList}>
              {renderIngredientsList(recipe.ingredients)}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  errorHeader: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ef4444',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  backButtonInline: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  backButtonTextInline: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingRight: 12,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4f46e5',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  placeholderIcon: {
    fontSize: 54,
    marginBottom: 8,
  },
  placeholderLabel: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 32,
    marginBottom: 20,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  ingredientsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
  ingredientsList: {
    marginTop: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  bullet: {
    fontSize: 12,
    color: '#6366f1',
    marginRight: 12,
    alignSelf: 'center',
  },
  ingredientTextString: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    fontWeight: '500',
  },
  ingredientName: {
    fontSize: 15,
    color: '#334155',
    flex: 1,
    fontWeight: '500',
  },
  quantityBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '700',
  },
});
