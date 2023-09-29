import { View, Text, ScrollView } from 'react-native';

export default function ArticleScreen({ selectedArticleId, articleData }) {
  // Find the selected article based on the selectedArticleId
  const selectedArticle = articleData.find((article) => article.id === selectedArticleId);
  const excludedKeys = ['id', 'is_adult', 'gender'];

  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
          Qu'est-ce que vous recherchez ?
        </Text>
      </View>
      {/* Render the selected article */}
      {selectedArticle && (
        <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
          {Object.entries(selectedArticle).map(([key, value]) => (
            // Check if the key should be excluded
            excludedKeys.includes(key) ? null : (
              <Text key={key}>{value}</Text>
            )
          ))}
        </View>
      )}
    </ScrollView>
  );
}
