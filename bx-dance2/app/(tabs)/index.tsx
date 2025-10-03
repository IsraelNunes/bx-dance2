import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useDanceApp } from '@/hooks/useDanceApp';
import { useSearchInput } from '@/hooks/useSearchInput';
import { useScrollView } from '@/hooks/useScrollView';
import { DanceModule } from '@/types/dance';

export default function HomeScreen() {
  const {
    appState,
    loadingState,
    setSearchQuery,
    setSelectedLevel,
    getFilteredModules,
    getModuleProgress
  } = useDanceApp();

  const { searchInputRef, focusSearchInput, createDebouncedCallback } = useSearchInput();
  const { scrollViewRef } = useScrollView();

  const debouncedSearch = createDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filteredModules = getFilteredModules();

  const handleModulePress = (module: DanceModule) => {
    router.push({
      pathname: '/module',
      params: {
        moduleId: module.id,
        moduleTitle: module.title,
        moduleData: JSON.stringify(module)
      }
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'iniciante': return '#FF8C00';
      case 'intermediario': return '#FF8C00';
      case 'avancado': return '#FF8C00';
      default: return '#FF8C00';
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case 'iniciante': return 'Iniciante';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      default: return level;
    }
  };

  const renderModule = ({ item }: { item: DanceModule }) => {
    const progress = getModuleProgress(item.id);
    const progressPercentage = progress?.progressPercentage || 0;

    return (
      <TouchableOpacity
        style={styles.moduleCard}
        onPress={() => handleModulePress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.moduleImage}
          contentFit="cover"
        />
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>{item.title}</Text>
          <Text style={styles.moduleInstructor}>por {item.instructor}</Text>
          <Text style={styles.moduleDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.moduleStats}>
            <View style={styles.levelBadge}>
              <Text style={[styles.levelText, { color: getLevelColor(item.level) }]}>
                {getDifficultyText(item.level)}
              </Text>
            </View>
            <Text style={styles.videoCount}>{item.videoCount} vídeos</Text>
            <Text style={styles.duration}>{Math.round(item.duration / 60)}min</Text>
          </View>

          {progressPercentage > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                />
              </View>
              <Text style={styles.progressText}>{progressPercentage}% concluído</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderLevelFilter = () => {
    const levels = [
      { key: 'todos', label: 'Todos' },
      { key: 'iniciante', label: 'Iniciante' },
      { key: 'intermediario', label: 'Intermediário' },
      { key: 'avancado', label: 'Avançado' },
    ] as const;

    return (
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={levels}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                appState.selectedLevel === item.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedLevel(item.key)}
            >
              <Text style={[
                styles.filterButtonText,
                appState.selectedLevel === item.key && styles.filterButtonTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loadingState.isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando módulos de dança...</Text>
      </SafeAreaView>
    );
  }

  if (loadingState.error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro: {loadingState.error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => Alert.alert('Erro', 'Funcionalidade de retry seria implementada aqui')}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Módulos de Dança</Text>

        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Buscar por estilo, instrutor..."
            placeholderTextColor="#888888"
            onChangeText={debouncedSearch}
            onFocus={focusSearchInput}
          />
        </View>

        {renderLevelFilter()}
      </View>

      <FlatList
        ref={scrollViewRef}
        data={filteredModules}
        keyExtractor={(item) => item.id}
        renderItem={renderModule}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {appState.searchQuery || appState.selectedLevel !== 'todos'
                ? 'Nenhum módulo encontrado com os filtros aplicados.'
                : 'Nenhum módulo disponível.'
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF8C00',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C00',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FF8C00',
    color: '#ffffff',
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  filterButtonActive: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  moduleCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  moduleImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  moduleInfo: {
    padding: 16,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  moduleInstructor: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#aaaaaa',
    lineHeight: 20,
    marginBottom: 12,
  },
  moduleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelBadge: {
    marginRight: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  videoCount: {
    fontSize: 12,
    color: '#cccccc',
    marginRight: 12,
  },
  duration: {
    fontSize: 12,
    color: '#cccccc',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
});
