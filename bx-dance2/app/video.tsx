import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { useDanceApp } from '@/hooks/useDanceApp';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { DanceVideo, DanceModule } from '@/types/dance';


export default function VideoScreen() {
  const params = useLocalSearchParams();
  const [video, setVideo] = useState<DanceVideo | null>(null);
  const [module, setModule] = useState<DanceModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const { updateVideoProgress } = useDanceApp();
  const { videoRef, playerControls } = useVideoPlayer();

  useEffect(() => {
    let isMounted = true;

    const loadVideoData = async () => {
      try {
        setIsLoading(true);

        // Simular loading
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        if (params.videoData && params.moduleData) {
          const videoData = JSON.parse(params.videoData as string) as DanceVideo;
          const moduleData = JSON.parse(params.moduleData as string) as DanceModule;
          setVideo(videoData);
          setModule(moduleData);
        } else {
          Alert.alert('Erro', 'Dados do vídeo não encontrados');
          router.back();
          return;
        }

        setIsLoading(false);

      } catch (error) {
        if (!isMounted) return;
        console.error('Erro ao carregar vídeo:', error);
        Alert.alert('Erro', 'Não foi possível carregar o vídeo');
        router.back();
      }
    };

    loadVideoData();

    // Cleanup function OBRIGATÓRIA
    return () => {
      isMounted = false;
    };
  }, [params.videoData, params.moduleData]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isPlaying) {
      // Atualizar progresso a cada segundo
      progressInterval = setInterval(async () => {
        try {
          const currentTime = await playerControls.getCurrentTime();
          setPosition(currentTime);

          // Marcar como assistido quando chegar a 80% do vídeo
          if (video && currentTime >= (duration * 0.8)) {
            updateVideoProgress(video.moduleId, video.id, duration);
          }
        } catch (error) {
          console.error('Erro ao obter tempo atual:', error);
        }
      }, 1000);
    }

    // Cleanup function OBRIGATÓRIA
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [isPlaying, duration, video, playerControls, updateVideoProgress]);

  useEffect(() => {
    let hideControlsTimeout: NodeJS.Timeout;

    if (showControls && isPlaying) {
      hideControlsTimeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    // Cleanup function OBRIGATÓRIA
    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
      }
    };
  }, [showControls, isPlaying]);

  const handlePlayPause = useCallback(async () => {
    try {
      if (isPlaying) {
        await playerControls.pause();
        setIsPlaying(false);
      } else {
        await playerControls.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao controlar reprodução:', error);
    }
  }, [isPlaying, playerControls]);

  const handleSeek = useCallback(async (seconds: number) => {
    try {
      await playerControls.seekTo(seconds);
      setPosition(seconds);
    } catch (error) {
      console.error('Erro ao navegar no vídeo:', error);
    }
  }, [playerControls]);

  const handlePlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setPosition(status.positionMillis / 1000);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        // Vídeo terminou - marcar como concluído
        if (video) {
          updateVideoProgress(video.moduleId, video.id, duration);
          Alert.alert(
            'Vídeo Concluído!',
            'Parabéns! Você completou esta lição.',
            [
              {
                text: 'Continuar',
                onPress: () => router.back()
              }
            ]
          );
        }
      }
    }
  }, [video, duration, updateVideoProgress]);

  const toggleControls = useCallback(() => {
    setShowControls(!showControls);
  }, [showControls]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando vídeo...</Text>
      </SafeAreaView>
    );
  }

  if (!video || !module) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Vídeo não encontrado</Text>
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
      <View style={styles.videoContainer}>
        <TouchableOpacity
          style={styles.videoWrapper}
          onPress={toggleControls}
          activeOpacity={1}
        >
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: video.videoUrl }}
            resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />

          {showControls && (
            <View style={styles.controlsOverlay}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayPause}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              </TouchableOpacity>

              <View style={styles.bottomControls}>
                <Text style={styles.timeText}>
                  {formatTime(position)} / {formatTime(duration)}
                </Text>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${duration > 0 ? (position / duration) * 100 : 0}%` }
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.seekButtons}>
                  <TouchableOpacity
                    style={styles.seekButton}
                    onPress={() => handleSeek(Math.max(0, position - 10))}
                  >
                    <Text style={styles.seekButtonText}>-10s</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.seekButton}
                    onPress={() => handleSeek(Math.min(duration, position + 10))}
                  >
                    <Text style={styles.seekButtonText}>+10s</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{video.title}</Text>

        <View style={styles.videoMeta}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <View style={styles.levelBadge}>
            <Text style={[styles.levelText, { color: getLevelColor(video.level) }]}>
              {getDifficultyText(video.level)}
            </Text>
          </View>
        </View>

        <Text style={styles.videoDescription}>{video.description}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.back()}
          >
            <Text style={styles.actionButtonText}>Voltar ao Módulo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => {
              // Navegar para o próximo vídeo se existir
              const currentIndex = module.videos.findIndex(v => v.id === video.id);
              if (currentIndex >= 0 && currentIndex < module.videos.length - 1) {
                const nextVideo = module.videos[currentIndex + 1];
                router.replace({
                  pathname: '/video',
                  params: {
                    videoId: nextVideo.id,
                    moduleId: module.id,
                    videoData: JSON.stringify(nextVideo),
                    moduleData: JSON.stringify(module)
                  }
                });
              } else {
                Alert.alert('Parabéns!', 'Você completou todos os vídeos deste módulo!');
                router.back();
              }
            }}
          >
            <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
              Próximo Vídeo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  videoWrapper: {
    flex: 1,
    position: 'relative',
  },
  video: {
    flex: 1,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  playButtonText: {
    fontSize: 32,
    color: '#000',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF8C00',
    borderRadius: 2,
  },
  seekButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  seekButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  seekButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  videoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  moduleTitle: {
    fontSize: 16,
    color: '#cccccc',
    flex: 1,
  },
  levelBadge: {
    marginLeft: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  videoDescription: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  primaryButton: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cccccc',
  },
  primaryButtonText: {
    color: 'white',
  },
});