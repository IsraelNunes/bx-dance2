import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDanceApp } from '@/hooks/useDanceApp';
import { useScrollView } from '@/hooks/useScrollView';
import { DanceModule } from '@/types/dance';

export default function ProfileScreen() {
  const {
    appState,
    resetProgress
  } = useDanceApp();

  const { scrollViewRef } = useScrollView();

  const getTotalProgress = () => {
    if (appState.userProgress.length === 0) return 0;
    const totalPercentage = appState.userProgress.reduce((sum, progress) => sum + progress.progressPercentage, 0);
    return Math.round(totalPercentage / appState.userProgress.length);
  };

  const getTotalVideosWatched = () => {
    return appState.userProgress.reduce((sum, progress) => sum + progress.completedVideos.length, 0);
  };

  const getTotalTimeWatched = () => {
    const totalMinutes = appState.userProgress.reduce((sum, progress) => sum + progress.totalTimeWatched, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return { hours, minutes };
  };

  const getModuleById = (moduleId: string): DanceModule | undefined => {
    return appState.modules.find(module => module.id === moduleId);
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Resetar Progresso',
      'Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: () => {
            resetProgress();
            Alert.alert('Sucesso', 'Progresso resetado com sucesso!');
          },
        },
      ]
    );
  };

  const renderProgressCard = () => {
    const totalProgress = getTotalProgress();
    const videosWatched = getTotalVideosWatched();
    const { hours, minutes } = getTotalTimeWatched();

    return (
      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Seu Progresso Geral</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressPercentage}>{totalProgress}%</Text>
            <Text style={styles.progressLabel}>Concluído</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalProgress}%` }]} />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{videosWatched}</Text>
            <Text style={styles.statLabel}>Vídeos Assistidos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{hours}h {minutes}m</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{appState.modules.length}</Text>
            <Text style={styles.statLabel}>Módulos Disponíveis</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderModuleProgress = () => {
    const progressWithModules = appState.userProgress
      .map(progress => ({
        ...progress,
        module: getModuleById(progress.moduleId)
      }))
      .filter(item => item.module)
      .sort((a, b) => b.progressPercentage - a.progressPercentage);

    return (
      <View style={styles.moduleProgressCard}>
        <Text style={styles.cardTitle}>Progresso por Módulo</Text>

        {progressWithModules.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Você ainda não começou nenhum módulo.
              Visite a aba &quot;Módulos&quot; para começar a aprender!
            </Text>
          </View>
        ) : (
          progressWithModules.map((item) => (
            <View key={item.moduleId} style={styles.moduleProgressItem}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>{item.module!.title}</Text>
                <Text style={styles.modulePercentage}>{item.progressPercentage}%</Text>
              </View>

              <View style={styles.moduleProgressBar}>
                <View
                  style={[
                    styles.moduleProgressFill,
                    { width: `${item.progressPercentage}%` }
                  ]}
                />
              </View>

              <View style={styles.moduleStats}>
                <Text style={styles.moduleStatText}>
                  {item.completedVideos.length} de {item.module!.videoCount} vídeos
                </Text>
                <Text style={styles.moduleStatText}>
                  Último acesso: {new Date(item.lastAccessed).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderAchievements = () => {
    const totalProgress = getTotalProgress();
    const videosWatched = getTotalVideosWatched();

    const achievements = [
      {
        id: 'first_video',
        title: 'Primeiro Passo',
        description: 'Assistiu ao primeiro vídeo',
        completed: videosWatched >= 1,
        icon: '🎯'
      },
      {
        id: 'five_videos',
        title: 'Em Movimento',
        description: 'Assistiu a 5 vídeos',
        completed: videosWatched >= 5,
        icon: '🔥'
      },
      {
        id: 'first_module',
        title: 'Módulo Completo',
        description: 'Completou um módulo inteiro',
        completed: appState.userProgress.some(p => p.progressPercentage === 100),
        icon: '🏆'
      },
      {
        id: 'half_progress',
        title: 'No Meio do Caminho',
        description: 'Progresso geral de 50%',
        completed: totalProgress >= 50,
        icon: '⭐'
      },
      {
        id: 'all_modules',
        title: 'Dançarino Completo',
        description: 'Completou todos os módulos',
        completed: totalProgress === 100,
        icon: '👑'
      }
    ];

    return (
      <View style={styles.achievementsCard}>
        <Text style={styles.cardTitle}>Conquistas</Text>

        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementItem,
              achievement.completed && styles.achievementCompleted
            ]}
          >
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={[
                styles.achievementTitle,
                achievement.completed && styles.achievementTitleCompleted
              ]}>
                {achievement.title}
              </Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            {achievement.completed && (
              <Text style={styles.achievementCheck}>✓</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
          <Text style={styles.subtitle}>Acompanhe seu progresso na dança</Text>
        </View>

        {renderProgressCard()}
        {renderModuleProgress()}
        {renderAchievements()}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetProgress}
        >
          <Text style={styles.resetButtonText}>Resetar Progresso</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Continue praticando para melhorar suas habilidades de dança! 💃🕺
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  progressCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginRight: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  moduleProgressCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  moduleProgressItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF8C00',
    flex: 1,
  },
  modulePercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  moduleProgressBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    marginBottom: 8,
  },
  moduleProgressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 3,
  },
  moduleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moduleStatText: {
    fontSize: 12,
    color: '#cccccc',
  },
  achievementsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    opacity: 0.6,
  },
  achievementCompleted: {
    backgroundColor: '#FF8C00',
    opacity: 1,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cccccc',
    marginBottom: 2,
  },
  achievementTitleCompleted: {
    color: '#000000',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#aaaaaa',
  },
  achievementCheck: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
});