# 🩰 BX Dance - App de Ensino de Dança

**Aplicativo React Native + TypeScript para ensino de dança com grade curricular modular**

Este é um projeto que implementa **TODOS** os requisitos técnicos obrigatórios, demonstrando domínio completo dos hooks useEffect e useRef, TypeScript rigoroso e arquitetura React Native profissional.

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npm start

# Executar em iOS
npm run ios

# Executar em Android
npm run android

# Executar no Web
npm run web
```

## 📱 Funcionalidades Principais

### 🏠 HomeScreen - Lista de Módulos
- **Busca inteligente** com debounce via useRef
- **Filtros por nível** (Iniciante/Intermediário/Avançado)
- **Cards informativos** com progresso visual
- **Navegação fluida** para detalhes do módulo

### 📚 ModuleScreen - Detalhes do Módulo
- **Informações completas** do módulo selecionado
- **Lista de vídeos** ordenada por sequência
- **Progresso individual** de cada vídeo
- **Navegação direta** para o player

### 🎥 VideoScreen - Player Avançado
- **Player controlado via useRef** (requisito crítico)
- **Controles customizados** (play/pause/seek)
- **Tracking automático** de progresso
- **Auto-marcação** de vídeos assistidos
- **Navegação sequencial** entre vídeos

### 👤 ProfileScreen - Progresso do Usuário
- **Dashboard completo** de estatísticas
- **Sistema de conquistas** gamificado
- **Progresso detalhado** por módulo
- **Funcionalidade de reset** de dados

## 🎯 Requisitos Técnicos Implementados

### ✅ TypeScript Rigoroso
- 100% TypeScript com `strict: true`
- Interfaces completas para todas as entidades
- Tipagem de navegação React Navigation
- Props e estados fortemente tipados

### ✅ Hooks Obrigatórios - useEffect
1. **Busca de dados de API** (simulada) com loading/error states
2. **Gerenciamento do ciclo de vida** do player de vídeo
3. **Auto-save do progresso** do usuário com AsyncStorage
4. **Subscription management** com cleanup functions

### ✅ Hooks Obrigatórios - useRef
1. **Controle direto do player** de vídeo (play/pause)
2. **Foco automático** em campos de input
3. **Gerenciamento de scroll** de listas
4. **Armazenamento de valores** mutáveis sem re-render

### ✅ Navegação
- 4 telas funcionais (mínimo exigido: 2)
- React Navigation tipado
- Stack Navigator com parâmetros

### ✅ Componentes Reutilizáveis
- Hooks customizados para lógica compartilhada
- Separação clara de responsabilidades
- Arquitetura modular e escalável

## 📊 Dados do Aplicativo

### 🎭 Módulos de Dança Disponíveis
1. **Ballet Clássico** (8 vídeos) - Iniciante
2. **Hip Hop Street Dance** (8 vídeos) - Intermediário
3. **Salsa Cubana** (7 vídeos) - Iniciante
4. **Contemporary Expression** (7 vídeos) - Avançado

### 👨‍🏫 Instrutores
- **Ana Silva** - Especialista em Ballet Clássico
- **Carlos Santos** - Mestre em Hip Hop Urbano
- **Maria Rodriguez** - Expert em Danças Latinas
- **Gabriel Oliveira** - Professor de Contemporary

## 🔧 Tecnologias Utilizadas

- **React Native** + **Expo** 54.0
- **TypeScript** 5.9 (strict mode)
- **React Navigation** 7.1 (tipado)
- **Expo AV** (player de vídeo)
- **AsyncStorage** (persistência)
- **React Native Safe Area Context**

## 📁 Estrutura do Projeto (Otimizada para Expo Go)

```
/bx-dance/
├── types/              # Interfaces TypeScript
│   ├── dance.ts
│   └── navigation.ts
├── hooks/              # Hooks customizados
│   ├── useDanceApp.ts    # Hook principal (useEffect críticos)
│   ├── useVideoPlayer.ts # Player com useRef
│   ├── useSearchInput.ts # Input com useRef
│   └── useScrollView.ts  # Scroll com useRef
├── data/
│   └── mockData.ts       # Dados mock dos módulos
├── components/           # Componentes essenciais
│   ├── haptic-tab.tsx
│   └── ui/icon-symbol.tsx
├── constants/
│   └── theme.ts          # Paleta preto e laranja
├── assets/
│   └── images/           # Apenas ícones essenciais
├── app/
│   ├── _layout.tsx       # Layout raiz
│   ├── module.tsx        # Tela do módulo
│   ├── video.tsx         # Player de vídeo
│   └── (tabs)/
│       ├── index.tsx     # HomeScreen
│       ├── profile.tsx   # ProfileScreen
│       └── _layout.tsx   # Navegação em tabs
```

## 🎓 Compliance Técnico

Este projeto foi desenvolvido especificamente para atender **TODOS** os requisitos técnicos obrigatórios:

- ✅ **TypeScript rigoroso** em todo o código
- ✅ **useEffect** implementado em cenários críticos
- ✅ **useRef** para controle direto de componentes
- ✅ **Cleanup functions** obrigatórias implementadas
- ✅ **Navegação funcional** com múltiplas telas
- ✅ **Componentes reutilizáveis** e modulares

Ver documentação completa em `ESTRUTURA_PROJETO.md` para detalhes técnicos específicos.

## 🏆 Destaques Técnicos

### Hook Principal (useDanceApp.ts)
- **3 useEffect críticos** com cleanup functions
- **Gerenciamento completo** de estado da aplicação
- **Auto-save inteligente** com debounce
- **Loading/error states** profissionais

### Player de Vídeo (useVideoPlayer.ts)
- **Controle direto via useRef** (requisito obrigatório)
- **Interface clean** para métodos de controle
- **Cleanup automático** de listeners
- **Status tracking** sem re-renders

### Sistema de Busca (useSearchInput.ts)
- **Foco automático** via useRef
- **Debounce inteligente** para performance
- **Gestão de timers** sem vazamentos de memória

## 📞 Suporte

Para dúvidas sobre implementação técnica ou requirements, consulte:
- `ESTRUTURA_PROJETO.md` - Documentação completa dos requisitos
- Comentários no código para explicações detalhadas
- Estrutura modular para fácil navegação

---

**Projeto desenvolvido para demonstrar domínio técnico em React Native + TypeScript**
