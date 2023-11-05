import { Navigate } from "react-router-dom";
import { useAppSelector } from "../rtk/hooks";

type Props = {
  children: React.ReactNode;
};
const RouteGuard = ({ children }: Props) => {
  const { user } = useAppSelector((state) => state.userSlice);

  if (user?.token) {
    return children;
  }

  return (
    <>
      <Navigate to="/auth" />
    </>
  );
};

export default RouteGuard;
