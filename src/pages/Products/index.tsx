import Categories from './Categories';
import List from './List';
import Search from './Search';
import Sort from './Sort';
import Chips from './Chips';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../store';

const Products = () => {
    const filter = useSelector((state: RootState) => state.filter);

    return (
        <>

            <div className='section-01'>
                <div className='c-wrapper'>
                    <Categories />

                    <div className='list-container'>

                        <div className='sort-search-container'>
                            <Sort />
                            <Search />
                        </div>
                        <div style={{marginBottom:"15px"}}>
                        <Chips />
                        </div>
                        <List />

                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
