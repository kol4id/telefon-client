import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./app/panes/ProtectedRoute";
import App from "./App";
import ErrorPage from "./app/panes/ErrorPage";
import AuthPane from "./app/panes/AuthPage/AuthPane";
import RegisterPane from "./app/panes/RegisterPage/RegisterPane";
import MiddlePane from "./app/panes/MiddlePane";
import RegisterManager from "./app/panes/RegisterPage/RegisterManager";
import ProfilePane from "./app/panes/ProfilePane";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/a" element={<ProtectedRoute children={<App/>}/>} errorElement={<ErrorPage/>}>
                <Route path=":channelId" index={true} element={<MiddlePane/>}/>
            </Route>
            <Route path="/register" element={<RegisterManager/>}>
                <Route path="/register" index={true} element={<RegisterPane/>}/>
                <Route path="data" element={<ProtectedRoute children={<ProfilePane/>}/>}/>
            </Route>
            <Route path="/auth" element={<AuthPane/>} />
            <Route path="*" element={<Navigate to={'/a'}/>} />
        </Routes>
    </Router>
);
  
  export default AppRoutes;