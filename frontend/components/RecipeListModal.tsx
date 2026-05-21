import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { fetchRecipes, Recipe, Ingredient } from '../api/recipes';
import { RecipeDetail } from './RecipeDetail';

export function RecipeListModal() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  useEffect(() => {
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(String(e));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Gathering recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // If a recipe is selected, render the RecipeDetail view
  if (selectedRecipeId !== null) {
    return (
      <RecipeDetail
        recipeId={selectedRecipeId}
        onBack={() => setSelectedRecipeId(null)}
      />
    );
  }

  // Filter recipes live based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Helper to safely render ingredients in the card preview (limit to 3 items)
  const renderCardIngredients = (ingredients: Ingredient[] | string) => {
    if (typeof ingredients === 'string') {
      const items = ingredients.split(',');
      return items.slice(0, 3).map((item, idx) => (
        <Text key={idx} style={styles.ingredientLine} numberOfLines={1}>
          • {item.trim()}
        </Text>
      ));
    }

    if (Array.isArray(ingredients)) {
      return ingredients.slice(0, 3).map((ing, idx) => (
        <Text key={idx} style={styles.ingredientLine} numberOfLines={1}>
          • {ing.name} — {ing.weight}{ing.unit}
        </Text>
      ));
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dr.Fit Recipes</Text>

      {/* Modern Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes by name..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
        {searchQuery.trim() !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>No matching recipes found</Text>
          </View>
        ) : (
          filteredRecipes.map((recipe) => {
            const hasImage = recipe.image && recipe.image.trim() !== '';
            return (
              <TouchableOpacity
                key={recipe.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setSelectedRecipeId(recipe.id)}
              >
                {/* Image Safeguard */}
                {hasImage ? (
                  <Image source={{ uri: recipe.image! }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderEmoji}>🍲</Text>
                    <Text style={styles.placeholderText}>Healthy Selection</Text>
                  </View>
                )}

                <View style={styles.cardBody}>
                  <Text style={styles.title}>{recipe.title}</Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.prepBadge}>
                      <Text style={styles.prepBadgeText}>⏱️ {recipe.prep_time} min</Text>
                    </View>
                  </View>
                  <View style={styles.ingredientsBlock}>
                    <Text style={styles.ingredientsHeader}>Ingredients:</Text>
                    {renderCardIngredients(recipe.ingredients)}
                    {/* Visual cue if there are more ingredients */}
                    {((typeof recipe.ingredients === 'string' && recipe.ingredients.split(',').length > 3) ||
                      (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 3)) && (
                      <Text style={styles.moreIngredients}>+ more ingredients</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  errorText: {
    color: '#ef4444',
    padding: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#f1f5f9',
  },
  imagePlaceholder: {
    width: '100%',
    height: 170,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  cardBody: {
    padding: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  prepBadge: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#bbf7d0',
  },
  prepBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  ingredientsBlock: {
    marginTop: 2,
  },
  ingredientsHeader: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    color: '#475569',
  },
  ingredientLine: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    fontWeight: '500',
  },
  moreIngredients: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
});
