import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import RiskAlertCard from './components/RiskAlertCard';
import FarmStatusPanel from './components/FarmStatusPanel';
import WeatherWidget from './components/WeatherWidget';
import QuickAccessTile from './components/QuickAccessTile';
import RecentAssessmentsTable from './components/RecentAssessmentsTable';

const FarmDashboard = () => {
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [farmData, setFarmData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [quickAccessTiles, setQuickAccessTiles] = useState([]);
    const [recentAssessments, setRecentAssessments] = useState([]);

    useEffect(() => {
        const mockAlerts = [
            {
                id: 1,
                title: "Critical Pest Window - Bollworm Infestation Risk",
                cropName: "Cotton",
                stage: "Flowering Stage",
                severity: "critical",
                daysRemaining: 3,
                confidence: 87,
                location: "Field A-12",
                description: "High bollworm activity detected in neighboring fields. Current temperature and humidity conditions favor rapid population growth. Immediate scouting and intervention required within 72 hours to prevent yield loss.",
                timestamp: "2026-01-10T06:15:00"
            },
            {
                id: 2,
                title: "Weather Risk - Heavy Rainfall Expected",
                cropName: "Wheat",
                stage: "Grain Filling",
                severity: "warning",
                daysRemaining: 5,
                confidence: 92,
                location: "Field B-08",
                description: "Forecast indicates 80mm+ rainfall over next 5 days. Risk of lodging and fungal disease development. Consider drainage preparation and fungicide application timing.",
                timestamp: "2026-01-10T05:30:00"
            },
            {
                id: 3,
                title: "Nutrient Stress Period Approaching",
                cropName: "Tomato",
                stage: "Fruiting Stage",
                severity: "warning",
                daysRemaining: 7,
                confidence: 78,
                location: "Greenhouse 3",
                description: "Peak nutrient demand period begins in 7 days. Current soil analysis shows declining potassium levels. Plan fertigation schedule adjustment to maintain fruit quality and size.",
                timestamp: "2026-01-10T04:45:00"
            },
            {
                id: 4,
                title: "Irrigation Timing Critical Window",
                cropName: "Maize",
                stage: "Tasseling",
                severity: "info",
                daysRemaining: 10,
                confidence: 85,
                location: "Field C-15",
                description: "Entering moisture-sensitive reproductive stage. Soil moisture monitoring indicates optimal irrigation window in 10 days. Water stress during this period significantly impacts kernel formation.",
                timestamp: "2026-01-10T03:20:00"
            }];


        const mockFarmData = {
            farmName: "Green Valley Farms",
            totalArea: 250,
            healthyFields: 12,
            monitoringFields: 4,
            activeCrops: [
                {
                    id: 1,
                    name: "Cotton",
                    stage: "Flowering Stage",
                    area: 85,
                    daysToHarvest: 65,
                    image: "https://images.unsplash.com/photo-1574772579417-8aed55bff7a9",
                    imageAlt: "White cotton bolls growing on green cotton plant with open flowers in agricultural field under bright sunlight",
                    upcomingCriticalPeriod: "Boll formation begins in 12 days"
                },
                {
                    id: 2,
                    name: "Wheat",
                    stage: "Grain Filling",
                    area: 120,
                    daysToHarvest: 28,
                    image: "https://images.unsplash.com/photo-1648063635311-dfd375146078",
                    imageAlt: "Golden wheat stalks with mature grain heads swaying in agricultural field during harvest season with clear blue sky",
                    upcomingCriticalPeriod: null
                },
                {
                    id: 3,
                    name: "Tomato",
                    stage: "Fruiting Stage",
                    area: 15,
                    daysToHarvest: 35,
                    image: "https://images.unsplash.com/photo-1684141023233-0b56b95b2af1",
                    imageAlt: "Red ripe tomatoes growing on green vine plant in greenhouse with supporting stakes and healthy foliage",
                    upcomingCriticalPeriod: "Peak harvest window in 30 days"
                }]

        };

        const mockWeatherData = {
            location: "Green Valley Region",
            temperature: 28,
            feelsLike: 31,
            humidity: 68,
            windSpeed: 12,
            pressure: 1013,
            visibility: 10,
            forecast: [
                { day: "Mon", condition: "sunny", temp: 29 },
                { day: "Tue", condition: "cloudy", temp: 27 },
                { day: "Wed", condition: "rainy", temp: 24 },
                { day: "Thu", condition: "rainy", temp: 23 },
                { day: "Fri", condition: "cloudy", temp: 26 },
                { day: "Sat", condition: "sunny", temp: 28 },
                { day: "Sun", condition: "sunny", temp: 30 }],

            riskAlert: "Heavy rainfall expected Wed-Thu. Monitor field drainage and plan operations accordingly."
        };

        const mockQuickAccessTiles = [
            {
                id: 1,
                title: "Pre-Sowing Risk Analysis",
                description: "Evaluate crop options and relative risk levels before planting decisions",
                icon: "Sprout",
                iconColor: "text-primary",
                bgColor: "bg-primary/10",
                path: "/pre-sowing-risk-analysis",
                badge: "New Season",
                badgeColor: "bg-success/10 text-success"
            },
            {
                id: 2,
                title: "Stage-Aware Monitoring",
                description: "Track in-season risk windows and critical decision periods for active crops",
                icon: "Activity",
                iconColor: "text-accent",
                bgColor: "bg-accent/10",
                path: "/stage-aware-risk-monitor",
                badge: "4 Active",
                badgeColor: "bg-warning/10 text-warning"
            },
            {
                id: 3,
                title: "Bulk Farm Assessment",
                description: "Upload CSV for multi-farm risk analysis and regional insights",
                icon: "Upload",
                iconColor: "text-secondary",
                bgColor: "bg-secondary/10",
                path: "/pre-sowing-risk-analysis",
                badge: "B2B",
                badgeColor: "bg-primary/10 text-primary"
            }];


        const mockRecentAssessments = [
            {
                id: 1,
                crop: "Cotton",
                location: "Field A-12",
                type: "Pre-Sowing Analysis",
                confidence: 87,
                date: "2026-01-08T10:30:00",
                status: "Completed"
            },
            {
                id: 2,
                crop: "Wheat",
                location: "Field B-08",
                type: "Stage Risk Monitor",
                confidence: 92,
                date: "2026-01-07T14:15:00",
                status: "Completed"
            },
            {
                id: 3,
                crop: "Tomato",
                location: "Greenhouse 3",
                type: "Pre-Sowing Analysis",
                confidence: 78,
                date: "2026-01-06T09:45:00",
                status: "Completed"
            },
            {
                id: 4,
                crop: "Maize",
                location: "Field C-15",
                type: "Stage Risk Monitor",
                confidence: 85,
                date: "2026-01-05T16:20:00",
                status: "In Progress"
            },
            {
                id: 5,
                crop: "Soybean",
                location: "Field D-22",
                type: "Pre-Sowing Analysis",
                confidence: 73,
                date: "2026-01-04T11:00:00",
                status: "Completed"
            }];


        setActiveAlerts(mockAlerts);
        setFarmData(mockFarmData);
        setWeatherData(mockWeatherData);
        setQuickAccessTiles(mockQuickAccessTiles);
        setRecentAssessments(mockRecentAssessments);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <NavigationBreadcrumb />
            <main className="pt-20 pb-8 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                            Farm Dashboard
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Centralized risk intelligence and decision support for your farming operations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                        <div className="lg:col-span-2 space-y-4 md:space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg md:text-xl font-semibold text-foreground">
                                        Active Risk Alerts
                                    </h2>
                                    <span className="text-sm text-muted-foreground">
                                        {activeAlerts?.length} alerts requiring attention
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {activeAlerts?.map((alert) =>
                                        <RiskAlertCard key={alert?.id} alert={alert} />
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
                                    Quick Access Tools
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quickAccessTiles?.map((tile) =>
                                        <QuickAccessTile key={tile?.id} tile={tile} />
                                    )}
                                </div>
                            </div>

                            <RecentAssessmentsTable assessments={recentAssessments} />
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            {farmData && <FarmStatusPanel farmData={farmData} />}
                            {weatherData && <WeatherWidget weatherData={weatherData} />}
                        </div>
                    </div>
                </div>
            </main>
            <QuickActionToolbar />
        </div>);

};

export default FarmDashboard;