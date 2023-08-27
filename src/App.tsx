import "./input.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProviders } from "./Context/AuthProviders";
import { StateProvider } from "./Context/StateProvider";
import { DataProviders } from "./Context/DataProviders";

import { AllRoutes } from "./Routes";
import Fetch from "./Components/Item/Fetch";
const App = () => {
  return (
    <>
      <DataProviders>
        <StateProvider>
          <AuthProviders>
            <Fetch />
            <Router>
              <Routes>
                {AllRoutes.map((route, index) => {
                  let Layout = route.Layout;

                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </Router>
          </AuthProviders>
        </StateProvider>
      </DataProviders>
    </>
  );
};

export default App;
