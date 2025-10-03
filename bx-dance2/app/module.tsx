import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { useDanceApp } from '@/hooks/useDanceApp';
import { useScrollView } from '@/hooks/useScrollView';
import { DanceModule, DanceVideo } from '@/types/dance';

export default function ModuleScreen() {
  const params = useLocalSearchParams();
  const [module, setModule] = useState<DanceModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    appState,
    getModuleProgress
  } = useDanceApp();

  const { scrollViewRef } = useScrollView();

  useEffect(() => {
    let isMounted = true;

    const loadModuleData = async () => {
      try {
        setIsLoading(true);

        // Simular loading
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        if (params.moduleData) {
          const moduleData = JSON.parse(params.moduleData as string) as DanceModule;
          setModule(moduleData);
        } else {
          // Fallback: buscar pelo ID nos dados da app
          const moduleId = params.moduleId as string;
          const foundModule = appState.modules.find(m => m.id === moduleId);
          setModule(foundModule || null);
        }

        setIsLoading(false);

      } catch (error) {
        if (!isMounted) return;
        console.error('Erro ao carregar módulo:', error);
        Alert.alert('Erro', 'Não foi possível carregar o módulo');
        setIsLoading(false);
      }
    };

    loadModuleData();

    // Cleanup function OBRIGATÓRIA
    return () => {
      isMounted = false;
    };
  }, [params.moduleId, params.moduleData, appState.modules]);

  const handleVideoPress = (video: DanceVideo) => {
    if (!module) return;

    router.push({
      pathname: '/video',
      params: {
        videoId: video.id,
        moduleId: module.id,
        videoData: JSON.stringify(video),
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

  const renderVideo = ({ item, index }: { item: DanceVideo; index: number }) => {
    const moduleProgress = getModuleProgress(module!.id);
    const isCompleted = moduleProgress?.completedVideos.includes(item.id) || false;

    return (
      <TouchableOpacity
        style={[styles.videoCard, isCompleted && styles.videoCardCompleted]}
        onPress={() => handleVideoPress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.videoThumbnail}
          contentFit="cover"
        />

        <View style={styles.videoInfo}>
          <View style={styles.videoHeader}>
            <Text style={styles.videoOrder}>#{index + 1}</Text>
            {isCompleted && <Text style={styles.completedBadge}>✓ Concluído</Text>}
          </View>

          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.videoStats}>
            <View style={styles.levelBadge}>
              <Text style={[styles.levelText, { color: getLevelColor(item.level) }]}>
                {getDifficultyText(item.level)}
              </Text>
            </View>
            <Text style={styles.videoDuration}>
              {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>

        <View style={styles.playIcon}>
          <Text style={styles.playIconText}>▶</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModuleHeader = () => {
    if (!module) return null;

    const moduleProgress = getModuleProgress(module.id);
    const progressPercentage = moduleProgress?.progressPercentage || 0;
    const completedVideos = moduleProgress?.completedVideos.length || 0;

    return (
      <View style={styles.moduleHeader}>
        <Image
          source={{ uri: module.thumbnailUrl }}
          style={styles.moduleImage}
          contentFit="cover"
        />

        <View style={styles.moduleOverlay}>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleInstructor}>por {module.instructor}</Text>

            <View style={styles.moduleStats}>
              <View style={styles.levelBadge}>
                <Text style={[styles.levelText, { color: getLevelColor(module.level) }]}>
                  {getDifficultyText(module.level)}
                </Text>
              </View>
              <Text style={styles.moduleStatText}>{module.videoCount} vídeos</Text>
              <Text style={styles.moduleStatText}>{Math.round(module.duration / 60)}min</Text>
            </View>
          </View>
        </View>

        <View style={styles.moduleDescription}>
          <Text style={styles.descriptionText}>{module.description}</Text>

          {progressPercentage > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  Progresso: {completedVideos} de {module.videoCount} vídeos
                </Text>
                <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando módulo...</Text>
      </SafeAreaView>
    );
  }

  if (!module) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Módulo não encontrado</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={scrollViewRef}
        data={module.videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        ListHeaderComponent={renderModuleHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum vídeo disponível neste módulo.
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
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  moduleHeader: {
    marginBottom: 20,
  },
  moduleImage: {
    width: '100%',
    height: 250,
  },
  moduleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  moduleInstructor: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  moduleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleStatText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginRight: 16,
  },
  moduleDescription: {
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#cccccc',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 3,
  },
  videoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  videoCardCompleted: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C00',
  },
  videoThumbnail: {
    width: 120,
    height: 90,
  },
  videoInfo: {
    flex: 1,
    padding: 12,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  videoOrder: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  completedBadge: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 18,
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelBadge: {
    marginRight: 8,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  videoDuration: {
    fontSize: 12,
    color: '#cccccc',
    fontWeight: '500',
  },
  playIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    backgroundColor: '#2a2a2a',
  },
  playIconText: {
    fontSize: 16,
    color: '#FF8C00',
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