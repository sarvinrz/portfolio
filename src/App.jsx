import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PATHS from "./routes/paths";
import { PortfolioContextProvider } from "./contexts/PortfolioContext";
import { CoinsContextProvider } from "./contexts/CoinsContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import Fallback from "./shared/Fallback";
import MainLayout from "./layouts/MainLayout";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeContextProvider>
          <CoinsContextProvider>
            <PortfolioContextProvider>
              <Router basename="/">
                <MainLayout>
                  <Suspense fallback={<Fallback />}>
                    <Routes>
                      <Route path="/" index element={<Home />} />
                      <Route path={PATHS.portfolio} element={<Portfolio />} />
                      <Route path={PATHS.login} element={<Login />} />
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                  </Suspense>
                </MainLayout>
              </Router>
            </PortfolioContextProvider>
          </CoinsContextProvider>
        </ThemeContextProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
