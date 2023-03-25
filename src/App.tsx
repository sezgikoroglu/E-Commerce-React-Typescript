import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBasketItems } from "./store/features/basket/basket";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const items=localStorage.getItem("basket");
    if (items){
      dispatch(setBasketItems(JSON.parse(items)))
    }
  },[])
  return (
    <Router />
  );
}

export default App;
