import { DanceModule, DanceVideo } from './dance';

export type RootStackParamList = {
  '(tabs)': undefined;
  'module': { module: DanceModule };
  'video': { video: DanceVideo; module: DanceModule };
  'modal': undefined;
};

export type TabParamList = {
  'index': undefined;
  'profile': undefined;
  'explore': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}