import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Delete, Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/features/filter/filterSlice";
import { RootState } from "../../store";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.filter.search);
  
  return (
    <div className="search-container">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <Delete
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(setSearch(""))}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
