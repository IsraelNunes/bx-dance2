/**
 * 🎥 HOOK DE PLAYER DE VÍDEO - useVideoPlayer
 *
 * Este hook demonstra o uso OBRIGATÓRIO de useRef em cenários críticos:
 * 1. Controle direto do player de vídeo (play/pause)
 * 2. Armazenamento de valores sem causar re-render
 * 3. Cleanup functions sem dependências
 *
 * REQUISITOS TÉCNICOS ATENDIDOS:
 * ✅ useRef para controle direto de componentes
 * ✅ useRef para valores mutáveis sem re-render
 * ✅ Cleanup functions armazenadas em useRef
 * ✅ Interface limpa para métodos de controle
 */

import { useRef, useCallback, useEffect } from 'react';
import { Video } from 'expo-av';
import { VideoPlayerRef } from '../types/dance';

export const useVideoPlayer = () => {
  // 🔥 useRef OBRIGATÓRIO #1: Controle direto do player de vídeo
  // PERMITE: Chamar métodos como play(), pause(), seekTo() diretamente
  const videoRef = useRef<Video>(null);

  // 🔥 useRef OBRIGATÓRIO #2: Armazenar valores que não devem causar re-render
  // BENEFÍCIO: Atualizar estes valores não dispara re-render desnecessário
  const playbackStatusRef = useRef({
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 0,
    shouldPlay: false,
  });

  // 🔥 useRef OBRIGATÓRIO #3: Armazenar callback de cleanup sem dependência
  // IMPORTANTE: Evita re-criação da cleanup function a cada render
  const cleanupRef = useRef<(() => void) | null>(null);

  // useEffect para setup e cleanup do player
  useEffect(() => {
    const setupPlayer = async () => {
      if (videoRef.current) {
        try {
          // Configurar player
          await videoRef.current.setStatusAsync({
            shouldPlay: false,
            isLooping: false,
            volume: 1.0,
          });

          // Configurar listener de status
          const statusCallback = (status: any) => {
            playbackStatusRef.current = {
              isPlaying: status.isPlaying || false,
              positionMillis: status.positionMillis || 0,
              durationMillis: status.durationMillis || 0,
              shouldPlay: status.shouldPlay || false,
            };
          };

          videoRef.current.setOnPlaybackStatusUpdate(statusCallback);

          // Armazenar cleanup function
          cleanupRef.current = () => {
            if (videoRef.current) {
              videoRef.current.setOnPlaybackStatusUpdate(null);
            }
          };

        } catch (error) {
          console.error('Erro ao configurar player:', error);
        }
      }
    };

    setupPlayer();

    // Cleanup function usando useRef
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.playAsync();
        playbackStatusRef.current.isPlaying = true;
      } catch (error) {
        console.error('Erro ao reproduzir vídeo:', error);
      }
    }
  }, []);

  const pause = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.pauseAsync();
        playbackStatusRef.current.isPlaying = false;
      } catch (error) {
        console.error('Erro ao pausar vídeo:', error);
      }
    }
  }, []);

  const seekTo = useCallback(async (seconds: number) => {
    if (videoRef.current) {
      try {
        await videoRef.current.setPositionAsync(seconds * 1000);
      } catch (error) {
        console.error('Erro ao navegar no vídeo:', error);
      }
    }
  }, []);

  const getCurrentTime = useCallback(async (): Promise<number> => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        return (status as any).positionMillis / 1000;
      } catch (error) {
        console.error('Erro ao obter tempo atual:', error);
        return 0;
      }
    }
    return 0;
  }, []);

  const setVolume = useCallback(async (volume: number) => {
    if (videoRef.current) {
      try {
        await videoRef.current.setStatusAsync({ volume: Math.max(0, Math.min(1, volume)) });
      } catch (error) {
        console.error('Erro ao ajustar volume:', error);
      }
    }
  }, []);

  const getPlayerRef = useCallback((): VideoPlayerRef => ({
    play,
    pause,
    seekTo,
    getCurrentTime,
    setVolume,
  }), [play, pause, seekTo, getCurrentTime, setVolume]);

  const getPlaybackStatus = useCallback(() => {
    return playbackStatusRef.current;
  }, []);

  return {
    videoRef,
    playerControls: getPlayerRef(),
    getPlaybackStatus,
  };
};