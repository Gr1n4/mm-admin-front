export interface FileEntity {
  id: string;
  size: number;
  extension: string;
  mimeType: string;
  fullName: string;
  originalName: string;
  url: string;
}

export interface PictureEntity {
  id: string;
  width: number;
  height: number;
  size: number;
  extension: string;
  fullName: string;
  originalName: string;
  url: string;
}
