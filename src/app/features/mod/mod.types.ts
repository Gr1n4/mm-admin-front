import { FileEntity, LangEntity, Option, PictureEntity } from '@/types';

export enum ModType {
  MOD = 'MOD',
  SEED = 'SEED',
  MAP = 'MAP',
  SKIN = 'SKIN',
}

export interface ModEntity {
  readonly id: string;
  readonly type: ModType;
  readonly name: LangEntity;
  readonly desc: LangEntity;
  readonly videoUrl: LangEntity;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRewarded: boolean;
  readonly isRewardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly picture: PictureEntity;
  readonly file: FileEntity;
  readonly tags: string[];
  readonly generationKey: string;
}

export interface ModCreatePayload {
  readonly type: ModType;
  readonly name: LangEntity;
  readonly desc: LangEntity;
  readonly videoUrl: LangEntity;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRewarded: boolean;
  readonly isRewardedEng: boolean;
  picture?: File;
  file?: File;
  readonly tags: string[];
  readonly generationKey: string;
}

export interface ModUpdatePayload {
  id: string;
  data: ModCreatePayload;
}

export interface SortedModResult {
  [ModType.MOD]: ModEntity[];
  [ModType.SEED]: ModEntity[];
  [ModType.SKIN]: ModEntity[];
  [ModType.MAP]: ModEntity[];
}

export interface SortedModIds {
  [ModType.MOD]: string[];
  [ModType.SEED]: string[];
  [ModType.SKIN]: string[];
  [ModType.MAP]: string[];
}

export interface SortedFeedDone {
  sortedIds: SortedModIds;
  record: Record<string, ModEntity>;
}

export interface SortedUpdatePayload {
  type: ModType;
  modIds: string[];
}

export interface ModState {
  feed: ModEntity[];
  sortedIds: SortedModIds;
  record: Record<string, ModEntity>;
  byId: Option<ModEntity>;
}
