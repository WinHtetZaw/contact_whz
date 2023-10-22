import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { decrement, increment } from "../rtk/features/counterSlice";

const Counter = () => {
  const { value } = useAppSelector((state) => state.counterSlice);
  const dispatch = useAppDispatch();
  return (
    <div className=" text-slate-950 p-5">
      <h3>Value : {value}</h3>
      <div className=" space-x-5">
        <button onClick={() => dispatch(increment())} className="btn-1 mt-5">
          Add
        </button>
        <button onClick={() => dispatch(decrement())} className="btn-1">
          Reduce
        </button>
      </div>
    </div>
  );
};

export default Counter;
