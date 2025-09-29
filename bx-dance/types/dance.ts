/**
 * 🏗️ INTERFACES TYPESCRIPT - TIPAGEM RIGOROSA
 *
 * Este arquivo demonstra TypeScript rigoroso com interfaces completas
 * para todas as entidades da aplicação.
 *
 * REQUISITOS TÉCNICOS ATENDIDOS:
 * ✅ Tipagem rigorosa habilitada (strict: true)
 * ✅ Interfaces para todas as entidades
 * ✅ Union types para valores específicos
 * ✅ Props e estados tipados
 * ✅ Métodos de API tipados
 */

/**
 * 🎭 Interface principal para módulos de dança
 * Representa um curso completo com metadados e vídeos
 */
export interface DanceModule {
  id: string;                    // Identificador único
  title: string;                 // Nome do módulo (ex: "Ballet Clássico")
  level: 'iniciante' | 'intermediario' | 'avancado'; // Nível de dificuldade
  style: string;                 // Estilo de dança (ex: "Ballet", "Hip Hop")
  videoCount: number;            // Quantidade total de vídeos
  duration: number;              // Duração total em segundos
  instructor: string;            // Nome do instrutor
  description: string;           // Descrição detalhada do módulo
  thumbnailUrl: string;          // URL da imagem de capa
  videos: DanceVideo[];          // Array de vídeos do módulo
}

/**
 * 🎥 Interface para vídeos individuais de dança
 * Cada vídeo pertence a um módulo específico
 */
export interface DanceVideo {
  id: string;                    // Identificador único do vídeo
  moduleId: string;              // ID do módulo pai
  title: string;                 // Título da aula (ex: "Posições Básicas")
  videoUrl: string;              // URL do arquivo de vídeo
  duration: number;              // Duração em segundos
  order: number;                 // Ordem dentro do módulo (1, 2, 3...)
  description: string;           // Descrição da aula
  thumbnailUrl: string;          // URL da thumbnail do vídeo
  level: 'iniciante' | 'intermediario' | 'avancado'; // Nível específico
}

/**
 * 📊 Interface para progresso do usuário
 * Armazena o avanço do usuário em cada módulo
 */
export interface UserProgress {
  moduleId: string;              // ID do módulo
  completedVideos: string[];     // Array de IDs de vídeos completados
  progressPercentage: number;    // Percentual de conclusão (0-100)
  lastAccessed: Date;            // Último acesso ao módulo
  totalTimeWatched: number;      // Tempo total assistido em minutos
}

/**
 * 🎯 Interface para estado global da aplicação
 * Gerencia todos os dados e estados da app
 */
export interface AppState {
  modules: DanceModule[];        // Lista de todos os módulos
  userProgress: UserProgress[];  // Progresso do usuário
  isLoading: boolean;            // Estado de carregamento
  error: string | null;          // Mensagem de erro (se houver)
  searchQuery: string;           // Termo de busca atual
  selectedLevel: 'todos' | 'iniciante' | 'intermediario' | 'avancado'; // Filtro de nível
}

/**
 * 🎮 Interface para controle do player de vídeo
 * Define métodos obrigatórios para controle via useRef
 */
export interface VideoPlayerRef {
  play: () => void;                        // Reproduzir vídeo
  pause: () => void;                       // Pausar vídeo
  seekTo: (seconds: number) => void;       // Navegar para posição específica
  getCurrentTime: () => Promise<number>;   // Obter tempo atual
  setVolume: (volume: number) => void;     // Ajustar volume (0-1)
}

/**
 * ⏳ Interface para estados de carregamento
 * Usado em operações assíncronas
 */
export interface LoadingState {
  isLoading: boolean;            // Se está carregando
  error: string | null;          // Mensagem de erro
}