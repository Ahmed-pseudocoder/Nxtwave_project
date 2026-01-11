import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PreSowingRiskAnalysis from './pages/pre-sowing-risk-analysis';
import FarmDashboard from './pages/farm-dashboard';
import StageAwareRiskMonitor from './pages/stage-aware-risk-monitor';
import RiskAlertDetails from './pages/risk-alert-details';
import Register from './pages/register';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your route here */}
                    <Route path="/" element={<FarmDashboard />} />
                    <Route path="/pre-sowing-risk-analysis" element={<PreSowingRiskAnalysis />} />
                    <Route path="/farm-dashboard" element={<FarmDashboard />} />
                    <Route path="/stage-aware-risk-monitor" element={<StageAwareRiskMonitor />} />
                    <Route path="/risk-alert-details" element={<RiskAlertDetails />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
