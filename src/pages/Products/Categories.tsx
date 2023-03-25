import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/products";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { ICategory } from "../../store/features/products/model";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { setSelectedCategories } from "../../store/features/filter/filterSlice";
import { setCategories } from "../../store/features/products/productsSlice";

const Categories = () => {
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const filteredCategories = useSelector(
    (state: RootState) => state.products.filteredCategories
  );
  
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleCheckboxChange = (e: any, ctg: string) => {
    let _ctg: Array<ICategory> = [...categories];
    const index = categories.findIndex((x) => x.name === ctg);
    _ctg[index] = { name: ctg, selected: e.target.checked };

    dispatch(
      setCategories({
        categories: _ctg,
        filteredCategories: _ctg.filter((x: ICategory) =>
          x.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ),
      })
    );
    dispatch(
      setSelectedCategories(_ctg.filter((x) => x.selected).map((x) => x.name))
    );
  };

  const renderCheckbox = (index: number, ctg: ICategory) => {
    return (
      <div key={"ctg" + ctg.name}>
        <FormControlLabel
          control={
            <Checkbox
              checked={ctg.selected}
              onChange={(e) => handleCheckboxChange(e, ctg.name)}
            />
          }
          label={ctg.name}
        />
      </div>
    );
  };

  return (
    <div className="categories-container">
      <TextField
        id="outlined-basic"
        label="search by categories"
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          dispatch(
            setCategories({
              categories: categories,
              filteredCategories: categories.filter((x: ICategory) =>
                x.name
                  .toLocaleLowerCase()
                  .includes(e.target.value.toLocaleLowerCase())
              ),
            })
          );
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {filteredCategories.map((ctg: ICategory, index: number) =>
        renderCheckbox(index, ctg)
      )}

      {filteredCategories.length === 0 && <p>Kategori Bulunamadı</p>}
    </div>
  );
};

export default Categories;
