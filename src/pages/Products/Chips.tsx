import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { RootState } from '../../store';
import filterSlice from '../../store/features/filter/filterSlice';
import {setSelectedCategories} from '../../store/features/filter/filterSlice';
import { useSelector,useDispatch } from 'react-redux';
import { set } from 'immer/dist/internal';
import { ICategory } from '../../store/features/products/model';
import { setCategories } from '../../store/features/products/productsSlice';

const Chips=()=>{
  const selectedCategories=useSelector((state:RootState) => state.filter.selectedCategories)
  const categories = useSelector((state: RootState) => state.products.categories);
  const filteredCategories = useSelector((state: RootState) => state.products.filteredCategories);
  const dispatch=useDispatch()
  
  const handleDelete = (ctg:string) => {
    let _ctg: Array<ICategory> = [...categories];
    const index = categories.findIndex(x => x.name === ctg);
    _ctg[index] = { name: ctg, selected: false };

    let _filteredCategories: Array<ICategory> = [...filteredCategories];
    const _index = filteredCategories.findIndex(x => x.name === ctg);
    _filteredCategories[_index] = { name: ctg, selected: false };

    dispatch(setCategories({
      categories: _ctg,
      filteredCategories: _filteredCategories
    }));

    dispatch(setSelectedCategories(_ctg.filter(x => x.selected).map(x => x.name)));
  };

  return (
    <Stack direction="row" spacing={1}>
      {
        selectedCategories.map(x=>(
          <Chip label={x} key={x} variant="outlined" onDelete={()=>handleDelete(x)} />
        ))
      }
    </Stack>
  );
}

export default Chips;