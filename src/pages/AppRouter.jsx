import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../router";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {routes.map(route => {
          return <Route path={route.path} 
                        element={route.element}
                        key={route.path} />
        })}
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </div>
  );
};

export default AppRouter;