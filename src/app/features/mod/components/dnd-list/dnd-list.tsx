import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useRef, useState } from 'react';
import DnDList from 'react-dnd-list';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateSortedModAction } from '../../mod.action';
import { getSortedIdsModSelector } from '../../mod.selector';
import { ModType } from '../../mod.types';
import { ModCard } from '../card';

interface ModDndListProps {
  type: ModType;
}

const Root = styled(Box)({
  // maxWidth: '40rem',
});

export const ModDndList: FC<ModDndListProps> = ({ type }) => {
  const dispatch = useDispatch();
  const mods = useSelector(getSortedIdsModSelector);
  const typeRef = useRef(type);
  const [list, setList] = useState(mods[type]);
  if (typeRef.current !== type) {
    setList(mods[type]);
    typeRef.current = type;
  }

  const updateSorted = () => {
    dispatch(updateSortedModAction.started({ type, modIds: list }));
  };

  console.log('typeRef: %o', typeRef);
  return (
    <Root>
      <Button onClick={updateSorted}>Сохранить сортировку</Button>
      <DnDList items={list} itemComponent={ModCard} setList={setList} />
    </Root>
  );
};
