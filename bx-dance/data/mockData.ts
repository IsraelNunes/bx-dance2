import { DanceModule, DanceVideo } from '../types/dance';

export const mockVideos: DanceVideo[] = [
  // Ballet Clássico
  { id: 'v1', moduleId: 'm1', title: 'Posições Básicas dos Pés', videoUrl: 'https://example.com/video1.mp4', duration: 480, order: 1, description: 'Aprenda as 5 posições fundamentais dos pés no ballet', thumbnailUrl: 'https://picsum.photos/300/200?random=1', level: 'iniciante' },
  { id: 'v2', moduleId: 'm1', title: 'Port de Bras Básico', videoUrl: 'https://example.com/video2.mp4', duration: 540, order: 2, description: 'Movimentos básicos dos braços no ballet clássico', thumbnailUrl: 'https://picsum.photos/300/200?random=2', level: 'iniciante' },
  { id: 'v3', moduleId: 'm1', title: 'Plié e Relevé', videoUrl: 'https://example.com/video3.mp4', duration: 600, order: 3, description: 'Exercícios fundamentais de flexão e elevação', thumbnailUrl: 'https://picsum.photos/300/200?random=3', level: 'iniciante' },
  { id: 'v4', moduleId: 'm1', title: 'Tendu e Dégagé', videoUrl: 'https://example.com/video4.mp4', duration: 720, order: 4, description: 'Extensões e movimentos deslizados do pé', thumbnailUrl: 'https://picsum.photos/300/200?random=4', level: 'intermediario' },
  { id: 'v5', moduleId: 'm1', title: 'Rond de Jambe', videoUrl: 'https://example.com/video5.mp4', duration: 660, order: 5, description: 'Círculos com a perna no ballet', thumbnailUrl: 'https://picsum.photos/300/200?random=5', level: 'intermediario' },
  { id: 'v6', moduleId: 'm1', title: 'Adagio Básico', videoUrl: 'https://example.com/video6.mp4', duration: 900, order: 6, description: 'Sequências lentas e controladas', thumbnailUrl: 'https://picsum.photos/300/200?random=6', level: 'intermediario' },
  { id: 'v7', moduleId: 'm1', title: 'Pirouettes Iniciante', videoUrl: 'https://example.com/video7.mp4', duration: 780, order: 7, description: 'Primeiros giros no ballet', thumbnailUrl: 'https://picsum.photos/300/200?random=7', level: 'avancado' },
  { id: 'v8', moduleId: 'm1', title: 'Grandes Battements', videoUrl: 'https://example.com/video8.mp4', duration: 540, order: 8, description: 'Grandes chutes da perna', thumbnailUrl: 'https://picsum.photos/300/200?random=8', level: 'avancado' },

  // Hip Hop
  { id: 'v9', moduleId: 'm2', title: 'Bounce e Groove', videoUrl: 'https://example.com/video9.mp4', duration: 420, order: 1, description: 'Fundamentos do movimento hip hop', thumbnailUrl: 'https://picsum.photos/300/200?random=9', level: 'iniciante' },
  { id: 'v10', moduleId: 'm2', title: 'Isolações do Corpo', videoUrl: 'https://example.com/video10.mp4', duration: 480, order: 2, description: 'Movimento isolado de diferentes partes do corpo', thumbnailUrl: 'https://picsum.photos/300/200?random=10', level: 'iniciante' },
  { id: 'v11', moduleId: 'm2', title: 'Top Rock Básico', videoUrl: 'https://example.com/video11.mp4', duration: 540, order: 3, description: 'Passos em pé do breaking', thumbnailUrl: 'https://picsum.photos/300/200?random=11', level: 'iniciante' },
  { id: 'v12', moduleId: 'm2', title: 'Waves e Rolls', videoUrl: 'https://example.com/video12.mp4', duration: 600, order: 4, description: 'Ondulações corporais no hip hop', thumbnailUrl: 'https://picsum.photos/300/200?random=12', level: 'intermediario' },
  { id: 'v13', moduleId: 'm2', title: 'Popping Básico', videoUrl: 'https://example.com/video13.mp4', duration: 660, order: 5, description: 'Contrações musculares ritmadas', thumbnailUrl: 'https://picsum.photos/300/200?random=13', level: 'intermediario' },
  { id: 'v14', moduleId: 'm2', title: 'Locking Fundamentals', videoUrl: 'https://example.com/video14.mp4', duration: 720, order: 6, description: 'Travadas e paradas súbitas', thumbnailUrl: 'https://picsum.photos/300/200?random=14', level: 'intermediario' },
  { id: 'v15', moduleId: 'm2', title: 'Breaking Power Moves', videoUrl: 'https://example.com/video15.mp4', duration: 900, order: 7, description: 'Movimentos de força no breaking', thumbnailUrl: 'https://picsum.photos/300/200?random=15', level: 'avancado' },
  { id: 'v16', moduleId: 'm2', title: 'Choreografia Hip Hop', videoUrl: 'https://example.com/video16.mp4', duration: 840, order: 8, description: 'Sequência coreográfica completa', thumbnailUrl: 'https://picsum.photos/300/200?random=16', level: 'avancado' },

  // Salsa
  { id: 'v17', moduleId: 'm3', title: 'Passos Básicos de Salsa', videoUrl: 'https://example.com/video17.mp4', duration: 360, order: 1, description: 'Passo básico da salsa cubana', thumbnailUrl: 'https://picsum.photos/300/200?random=17', level: 'iniciante' },
  { id: 'v18', moduleId: 'm3', title: 'Ritmo e Compasso', videoUrl: 'https://example.com/video18.mp4', duration: 420, order: 2, description: 'Entendendo o ritmo da salsa', thumbnailUrl: 'https://picsum.photos/300/200?random=18', level: 'iniciante' },
  { id: 'v19', moduleId: 'm3', title: 'Giros Básicos', videoUrl: 'https://example.com/video19.mp4', duration: 480, order: 3, description: 'Primeiros giros na salsa', thumbnailUrl: 'https://picsum.photos/300/200?random=19', level: 'iniciante' },
  { id: 'v20', moduleId: 'm3', title: 'Cross Body Lead', videoUrl: 'https://example.com/video20.mp4', duration: 540, order: 4, description: 'Movimento clássico da salsa', thumbnailUrl: 'https://picsum.photos/300/200?random=20', level: 'intermediario' },
  { id: 'v21', moduleId: 'm3', title: 'Right Turn e Left Turn', videoUrl: 'https://example.com/video21.mp4', duration: 600, order: 5, description: 'Giros direita e esquerda', thumbnailUrl: 'https://picsum.photos/300/200?random=21', level: 'intermediario' },
  { id: 'v22', moduleId: 'm3', title: 'Shines Solo', videoUrl: 'https://example.com/video22.mp4', duration: 660, order: 6, description: 'Passos individuais na salsa', thumbnailUrl: 'https://picsum.photos/300/200?random=22', level: 'intermediario' },
  { id: 'v23', moduleId: 'm3', title: 'Pasos Avanzados', videoUrl: 'https://example.com/video23.mp4', duration: 780, order: 7, description: 'Combinações avançadas', thumbnailUrl: 'https://picsum.photos/300/200?random=23', level: 'avancado' },

  // Contemporary
  { id: 'v24', moduleId: 'm4', title: 'Floor Work Básico', videoUrl: 'https://example.com/video24.mp4', duration: 540, order: 1, description: 'Movimentos no chão', thumbnailUrl: 'https://picsum.photos/300/200?random=24', level: 'iniciante' },
  { id: 'v25', moduleId: 'm4', title: 'Contrações e Releases', videoUrl: 'https://example.com/video25.mp4', duration: 480, order: 2, description: 'Técnica Graham básica', thumbnailUrl: 'https://picsum.photos/300/200?random=25', level: 'iniciante' },
  { id: 'v26', moduleId: 'm4', title: 'Spirals e Curves', videoUrl: 'https://example.com/video26.mp4', duration: 600, order: 3, description: 'Movimentos curvos do corpo', thumbnailUrl: 'https://picsum.photos/300/200?random=26', level: 'iniciante' },
  { id: 'v27', moduleId: 'm4', title: 'Traveling Across the Floor', videoUrl: 'https://example.com/video27.mp4', duration: 720, order: 4, description: 'Deslocamentos pelo espaço', thumbnailUrl: 'https://picsum.photos/300/200?random=27', level: 'intermediario' },
  { id: 'v28', moduleId: 'm4', title: 'Contact Improvisation', videoUrl: 'https://example.com/video28.mp4', duration: 840, order: 5, description: 'Improvisação com contato', thumbnailUrl: 'https://picsum.photos/300/200?random=28', level: 'intermediario' },
  { id: 'v29', moduleId: 'm4', title: 'Emotional Expression', videoUrl: 'https://example.com/video29.mp4', duration: 900, order: 6, description: 'Expressão emocional no contemporary', thumbnailUrl: 'https://picsum.photos/300/200?random=29', level: 'avancado' },
  { id: 'v30', moduleId: 'm4', title: 'Choreographic Composition', videoUrl: 'https://example.com/video30.mp4', duration: 1020, order: 7, description: 'Criação coreográfica', thumbnailUrl: 'https://picsum.photos/300/200?random=30', level: 'avancado' },
];

export const mockModules: DanceModule[] = [
  {
    id: 'm1',
    title: 'Ballet Clássico Fundamentos',
    level: 'iniciante',
    style: 'Ballet',
    videoCount: 8,
    duration: 5100,
    instructor: 'Ana Silva',
    description: 'Curso completo de ballet clássico para iniciantes. Aprenda as bases desta arte milenar com técnicas tradicionais e exercícios progressivos.',
    thumbnailUrl: 'https://picsum.photos/400/250?random=101',
    videos: mockVideos.filter(v => v.moduleId === 'm1')
  },
  {
    id: 'm2',
    title: 'Hip Hop Street Dance',
    level: 'intermediario',
    style: 'Hip Hop',
    videoCount: 8,
    duration: 4860,
    instructor: 'Carlos Santos',
    description: 'Domine os movimentos autênticos do hip hop. From old school to new school, aprenda todos os estilos desta cultura urbana.',
    thumbnailUrl: 'https://picsum.photos/400/250?random=102',
    videos: mockVideos.filter(v => v.moduleId === 'm2')
  },
  {
    id: 'm3',
    title: 'Salsa Cubana Essencial',
    level: 'iniciante',
    style: 'Salsa',
    videoCount: 7,
    duration: 3540,
    instructor: 'Maria Rodriguez',
    description: 'Aprenda a salsa cubana autêntica com passos tradicionais e modernos. Desenvolva seu ritmo e estilo latino.',
    thumbnailUrl: 'https://picsum.photos/400/250?random=103',
    videos: mockVideos.filter(v => v.moduleId === 'm3')
  },
  {
    id: 'm4',
    title: 'Contemporary Expression',
    level: 'avancado',
    style: 'Contemporary',
    videoCount: 7,
    duration: 5100,
    instructor: 'Gabriel Oliveira',
    description: 'Explore a expressão corporal através da dança contemporânea. Técnicas avançadas de movimento e interpretação.',
    thumbnailUrl: 'https://picsum.photos/400/250?random=104',
    videos: mockVideos.filter(v => v.moduleId === 'm4')
  }
];

export const initialProgress = mockModules.map(module => ({
  moduleId: module.id,
  completedVideos: [],
  progressPercentage: 0,
  lastAccessed: new Date(),
  totalTimeWatched: 0
}));