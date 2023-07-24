import { FileEntity, LangEntity, Option, PictureEntity } from '@/types';

export interface ModEntity {
  readonly id: string;
  readonly name: LangEntity;
  readonly desc: LangEntity;
  readonly videoUrl: LangEntity;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRevarded: boolean;
  readonly isRevardedEng: boolean;
  readonly likes: number;
  readonly downloads: number;
  readonly priority: number;
  readonly picture: PictureEntity;
  readonly file: FileEntity;
  readonly tags: string[];
}

export interface ModCreatePayload {
  readonly name: LangEntity;
  readonly desc: LangEntity;
  readonly videoUrl: LangEntity;
  readonly version: string;
  readonly cost: string;
  readonly isNew: boolean;
  readonly isRevarded: boolean;
  readonly isRevardedEng: boolean;
  readonly priority: number;
  picture?: File;
  file?: File;
  readonly tags: string[];
}

export interface ModUpdatePayload {
  id: string;
  data: ModCreatePayload;
}

export interface ModState {
  feed: ModEntity[];
  byId: Option<ModEntity>;
}
