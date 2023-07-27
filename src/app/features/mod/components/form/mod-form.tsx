import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Option } from '@/types';
import { Box, Button, Checkbox, Chip, FormControlLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { ImageUploader } from '@/components';
import { ModCreatePayload, ModType } from '../../mod.types';

interface CreateForm {
  type: ModType;
  nameRu: string;
  nameEn: string;
  descRu: string;
  descEn: string;
  videoUrlRu: string;
  videoUrlEn: string;
  version: string;
  cost: string;
  priority: string;
  isNew: boolean;
  isRewarded: boolean;
  isRewardedEng: boolean;
  tags: string[];
  picture?: Option<File | string>;
  file?: FileList;
  generationKey: string;
}

interface ModFormProps {
  defaultValues: CreateForm;
  onSubmit: (data: ModCreatePayload) => void;
}

function useFilePreview(file: Option<File | string>): string {
  const [url, setUrl] = useState<string>('https://via.placeholder.com/400');
  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUrl(fileReader.result as string);
    };
    if (file && typeof file !== 'string') {
      fileReader.readAsDataURL(file);
    }
  }, [file]);
  if (typeof file === 'string') {
    return file;
  }
  return url;
}

export const ModForm: FC<ModFormProps> = ({ defaultValues, onSubmit }) => {
  const [tagItem, setTagItem] = useState('');
  const { control, register, handleSubmit, getValues, setValue } = useForm<CreateForm>({
    defaultValues,
  });
  const values = getValues();
  const pictureUrl = useFilePreview(values.picture);

  const handleFormSubmit = (data: CreateForm): void => {
    console.log('data: %o', data);
    const {
      type,
      nameRu,
      nameEn,
      descRu,
      descEn,
      videoUrlRu,
      videoUrlEn,
      version,
      cost,
      priority,
      isNew,
      isRewarded,
      isRewardedEng,
      tags,
      file,
      picture,
      generationKey,
    } = data;
    const newData: ModCreatePayload = {
      type,
      name: { ru: nameRu, en: nameEn },
      desc: { ru: descRu, en: descEn },
      videoUrl: { ru: videoUrlRu, en: videoUrlEn },
      version,
      cost,
      priority: parseInt(priority, 10),
      isNew,
      isRewarded,
      isRewardedEng,
      tags,
      generationKey,
    };
    if (file && file[0]) {
      newData.file = file[0];
    }
    if (picture && picture instanceof File) {
      newData.picture = picture;
    }
    onSubmit(newData);
  };

  const handleDelete = (index: number) => () => {
    setValue('tags', values.tags.slice(index, 1));
  };

  const handleAddTag = (e): void => {
    e.preventDefault();
    e.stopPropagation();
    setValue('tags', [...values.tags, tagItem]);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={4}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select labelId="type-label" id="type" label="Тип" {...field}>
              <MenuItem value={ModType.MOD}>Мод</MenuItem>
              <MenuItem value={ModType.SEED}>Сид</MenuItem>
              <MenuItem value={ModType.MAP}>Карта</MenuItem>
              <MenuItem value={ModType.SKIN}>Скин</MenuItem>
            </Select>
          )}
        />
        <TextField label="Название на русском" {...register('nameRu', { required: true })} />
        <TextField label="Название на английском" {...register('nameEn', { required: true })} />
        <TextField label="Описание на русском" multiline maxRows={4} {...register('descRu', { required: true })} />
        <TextField label="Описание на английском" multiline maxRows={4} {...register('descEn', { required: true })} />
        <TextField label="Ссылка на youtube ru" {...register('videoUrlRu')} />
        <TextField label="Ссылка на youtube en" {...register('videoUrlEn')} />
        <TextField label="Версия" {...register('version')} />
        <TextField label="Цена" {...register('cost')} />
        <TextField label="Приоритет" {...register('priority')} />
        <FormControlLabel control={<Checkbox {...register('isNew')} />} label="Новый" />
        <FormControlLabel control={<Checkbox {...register('isRewarded')} />} label="Награжден" />
        <FormControlLabel control={<Checkbox {...register('isRewardedEng')} />} label="Награжден en" />
        <Box>
          <TextField label="Тэги" value={tagItem} onChange={(e) => setTagItem(e.target.value)} />
          <Button onClick={handleAddTag}>Добавить тэг</Button>
          {values.tags.map((tag, i) => (
            <Chip key={i} label={tag} onDelete={handleDelete(i)} />
          ))}
        </Box>
        <Controller
          name="picture"
          control={control}
          render={({ field }) => <ImageUploader title="Картинка" url={pictureUrl} onChange={field.onChange} />}
        />
        {values.type === ModType.SEED ? (
          <TextField label="Ключ генерации" {...register('generationKey')} />
        ) : (
          <input type="file" id="file" {...register('file')} />
        )}
        <Button type="submit" onClick={handleSubmit(handleFormSubmit)}>
          Создать
        </Button>
      </Stack>
    </form>
  );
};
