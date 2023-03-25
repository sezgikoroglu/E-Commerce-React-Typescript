
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { Basket } from '../component/basket';

const Home = () => {
    const filter = useSelector((state: RootState) => state.filter);

    return (
        <>
            <Link to={"/products"}>
                Products
            </Link>
            <Basket/>
        </>
    );
}

export default Home;
