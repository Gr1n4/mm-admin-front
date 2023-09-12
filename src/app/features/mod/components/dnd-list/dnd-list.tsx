import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useRef, useState } from 'react';
import DnDList from 'react-dnd-list';
import { useDispatch, useSelector } from 'react-redux';
import { removeByIdModAction, updateSortedModAction } from '../../mod.action';
import { getSortedIdsModSelector } from '../../mod.selector';
import { ModType } from '../../mod.types';
import { ModCard } from '../card';
import { RemoveModal } from '../remove-modal';

interface ModDndListProps {
  type: ModType;
}

const Root = styled(Box)({
  // maxWidth: '40rem',
});

export const ModDndList: FC<ModDndListProps> = ({ type }) => {
  const dispatch = useDispatch();
  const [removeId, setRemoveId] = useState<string | null>(null);
  const mods = useSelector(getSortedIdsModSelector);
  const typeRef = useRef(type);
  const [list, setList] = useState(mods[type]);
  if (typeRef.current !== type) {
    setList(mods[type]);
    typeRef.current = type;
  }
  const handleRemove = (): void => {
    if (removeId) {
      dispatch(removeByIdModAction.started(removeId));
      setRemoveId(null);
      setList(list.filter((id) => id !== removeId));
    }
  };

  const updateSorted = (): void => {
    dispatch(updateSortedModAction.started({ type, modIds: list }));
  };

  return (
    <Root>
      <Button onClick={updateSorted}>Сохранить сортировку</Button>
      {list.map((modId) => (
        <ModCard key={modId} modId={modId} onRemove={setRemoveId} />
      ))}
      {/*<DnDList items={list} itemComponent={ModCard} setList={setList} />*/}
      {removeId ? (
        <RemoveModal isOpen={!!removeId} modId={removeId} onClose={() => setRemoveId(null)} onRemove={handleRemove} />
      ) : null}
    </Root>
  );
};
