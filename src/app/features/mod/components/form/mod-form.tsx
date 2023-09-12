import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Option } from '@/types';
import { Box, Button, Checkbox, Chip, FormControlLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { ImageUploader } from '@/components';
import { ModCreatePayload, ModType } from '../../mod.types';
import * as R from 'ramda';
import { ObjectSchema, number, object, string } from 'yup';

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
  validationSchema?: ObjectSchema<CreateForm>;
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

const validationSchemaDefault = object({
  nameRu: string().required(),
  nameEn: string().required(),
  descRu: string().required(),
  descEn: string().required(),
  videoUrlRu: string().url().required(),
  videoUrlEn: string().url().required(),
  version: string().required(),
  cost: number().required().min(0).integer(),
});

export const ModForm: FC<ModFormProps> = ({ defaultValues, validationSchema = validationSchemaDefault, onSubmit }) => {
  const [tagItem, setTagItem] = useState('');
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  console.log('errors: %o', errors);
  const values = getValues();
  const pictureUrl = useFilePreview(values.picture);

  const handleFormSubmit = (data: CreateForm): void => {
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
        <TextField
          label="Название на русском"
          error={!!errors.nameRu?.message}
          helperText={errors.nameRu?.message}
          {...register('nameRu', { required: true })}
        />
        <TextField
          label="Название на английском"
          error={!!errors.nameEn?.message}
          helperText={errors.nameEn?.message}
          {...register('nameEn', { required: true })}
        />
        <TextField
          label="Описание на русском"
          error={!!errors.descRu?.message}
          helperText={errors.descRu?.message}
          multiline
          maxRows={4}
          {...register('descRu', { required: true })}
        />
        <TextField
          label="Описание на английском"
          error={!!errors.descEn?.message}
          helperText={errors.descEn?.message}
          multiline
          maxRows={4}
          {...register('descEn', { required: true })}
        />
        <TextField
          label="Ссылка на youtube ru"
          error={!!errors.videoUrlRu?.message}
          helperText={errors.videoUrlRu?.message}
          {...register('videoUrlRu')}
        />
        <TextField
          label="Ссылка на youtube en"
          error={!!errors.videoUrlEn?.message}
          helperText={errors.videoUrlEn?.message}
          {...register('videoUrlEn')}
        />
        <TextField
          label="Версия"
          error={!!errors.version?.message}
          helperText={errors.version?.message}
          {...register('version')}
        />
        <TextField
          label="Цена"
          error={!!errors.cost?.message}
          helperText={errors.cost?.message}
          {...register('cost')}
        />
        <FormControlLabel control={<Checkbox {...register('isNew')} />} label="Новый" />
        <FormControlLabel control={<Checkbox {...register('isRewarded')} />} label="Награжден" />
        <FormControlLabel control={<Checkbox {...register('isRewardedEng')} />} label="Награжден en" />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Box>
              <TextField label="Тэги" value={tagItem} onChange={(e) => setTagItem(e.target.value)} />
              <Button onClick={() => field.onChange([...field.value, tagItem])}>Добавить тэг</Button>
              {field.value.map((tag, i) => (
                <Chip key={i} label={tag} onDelete={() => field.onChange(R.remove(i, 1, field.value))} />
              ))}
            </Box>
          )}
        />
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
