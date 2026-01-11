import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import LocationInputForm from './components/LocationInputForm';
import SoilWaterInputForm from './components/SoilWaterInputForm';
import SeasonCropInputForm from './components/SeasonCropInputForm';
import RiskComparisonTable from './components/RiskComparisonTable';
import RiskExplanationCard from './components/RiskExplanationCard';
import SeasonalRiskChart from './components/SeasonalRiskChart';
import AnalysisActions from './components/AnalysisActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PreSowingRiskAnalysis = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        farmArea: '',
        elevation: '',
        soilType: '',
        waterSource: '',
        waterAvailability: '',
        season: '',
        selectedCrops: []
    });

    const [errors, setErrors] = useState({});
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const mockAnalysisResults = [
        {
            cropName: 'Cotton',
            variety: 'Bt Cotton Hybrid',
            riskLevel: 'Moderate',
            confidence: 78,
            keyFactors: ['Water stress during boll formation', 'Pest pressure in flowering stage', 'Market price volatility'],
            criticalWindow: 'Days 60-90'
        },
        {
            cropName: 'Soybean',
            variety: 'JS 335',
            riskLevel: 'Low',
            confidence: 85,
            keyFactors: ['Good soil compatibility', 'Adequate monsoon timing', 'Lower input costs'],
            criticalWindow: 'Days 45-60'
        },
        {
            cropName: 'Maize',
            variety: 'Hybrid Maize',
            riskLevel: 'Low',
            confidence: 82,
            keyFactors: ['Drought tolerance', 'Short duration crop', 'Stable market demand'],
            criticalWindow: 'Days 30-50'
        },
        {
            cropName: 'Groundnut',
            variety: 'TMV 2',
            riskLevel: 'High',
            confidence: 72,
            keyFactors: ['High water requirement', 'Disease susceptibility', 'Labor-intensive harvest'],
            criticalWindow: 'Days 70-100'
        }
    ];

    const mockExplanations = {
        'Cotton': {
            summary: "Cotton shows moderate risk due to water availability constraints and pest pressure during critical growth stages. The selected soil type supports cotton cultivation, but irrigation timing will be crucial during boll formation period.",
            favorableFactors: [
                'Soil type suitable for deep root development',
                'Season timing aligns with optimal temperature range',
                'Market infrastructure available for cotton trade'
            ],
            riskFactors: [
                'Water stress risk during peak demand period (60-90 days)',
                'Bollworm pressure historically high in this region',
                'Price volatility affects profitability margins',
                'Extended crop duration increases exposure to weather variability'
            ],
            timingSensitivity: "Critical irrigation windows at flowering (50-60 days) and boll formation (70-90 days). Delayed planting beyond optimal window increases pest and disease pressure significantly.",
            stageVulnerabilities: [
                { stage: 'Vegetative (0-45 days)', vulnerability: 'Moderate - Seedling establishment sensitive to soil moisture' },
                { stage: 'Flowering (45-70 days)', vulnerability: 'High - Water stress directly impacts boll setting' },
                { stage: 'Boll Formation (70-120 days)', vulnerability: 'Very High - Peak water demand and pest pressure' },
                { stage: 'Maturity (120-150 days)', vulnerability: 'Moderate - Weather damage to open bolls' }
            ]
        },
        'Soybean': {
            summary: "Soybean presents lower risk profile with good soil compatibility and favorable monsoon timing. Short duration reduces exposure to seasonal variability, making it a safer option for the assessed conditions.",
            favorableFactors: [
                'Excellent fit with available soil type and water resources',
                'Monsoon-dependent crop aligns with season selection',
                'Lower input costs compared to other options',
                'Nitrogen fixation reduces fertilizer dependency'
            ],
            riskFactors: [
                'Pod formation sensitive to moisture stress',
                'Yellow mosaic virus risk in certain periods',
                'Market price fluctuations based on global demand'
            ],
            timingSensitivity: "Planting window flexibility of 15-20 days. Critical moisture requirement during pod filling (45-60 days). Early planting reduces disease pressure.",
            stageVulnerabilities: [
                { stage: 'Vegetative (0-30 days)', vulnerability: 'Low - Robust seedling establishment' },
                { stage: 'Flowering (30-45 days)', vulnerability: 'Moderate - Moisture stress affects flower retention' },
                { stage: 'Pod Formation (45-75 days)', vulnerability: 'High - Critical water demand period' },
                { stage: 'Maturity (75-95 days)', vulnerability: 'Low - Harvest timing flexible within 10-day window' }
            ]
        },
        'Maize': {
            summary: "Maize demonstrates strong suitability with drought tolerance and short crop duration. Market stability and lower vulnerability to extreme weather make it a reliable choice for risk-averse planning.",
            favorableFactors: [
                'High drought tolerance compared to other cereals',
                'Short duration (90-110 days) reduces seasonal risk exposure',
                'Stable market demand for both grain and fodder',
                'Mechanization possible for most operations'
            ],
            riskFactors: [
                'Stem borer and fall armyworm pressure',
                'Pollination sensitive to high temperatures',
                'Storage pest issues if not properly managed'
            ],
            timingSensitivity: "Narrow planting window of 10-15 days for optimal yield. Tasseling period (40-50 days) highly sensitive to water stress. Delayed planting reduces yield by 1-2% per day.",
            stageVulnerabilities: [
                { stage: 'Vegetative (0-40 days)', vulnerability: 'Low - Rapid growth with moderate water needs' },
                { stage: 'Tasseling (40-55 days)', vulnerability: 'Very High - Pollination failure under stress' },
                { stage: 'Grain Filling (55-85 days)', vulnerability: 'Moderate - Moisture stress reduces grain weight' },
                { stage: 'Maturity (85-110 days)', vulnerability: 'Low - Harvest window of 15-20 days' }
            ]
        },
        'Groundnut': {
            summary: "Groundnut carries higher risk due to intensive water requirements and disease susceptibility. Labor-intensive operations and extended crop duration increase vulnerability to multiple stress factors.",
            favorableFactors: [
                'Good market price for quality produce',
                'Nitrogen fixation benefits soil health',
                'Multiple harvest windows provide flexibility'
            ],
            riskFactors: [
                'Very high water requirement throughout crop cycle',
                'Tikka disease and collar rot susceptibility',
                'Labor-intensive harvesting and post-harvest operations',
                'Aflatoxin contamination risk in storage',
                'Extended duration increases weather exposure'
            ],
            timingSensitivity: "Strict planting window of 7-10 days. Pegging stage (40-60 days) extremely sensitive to moisture. Pod development (70-100 days) requires consistent irrigation. Harvest timing critical to prevent aflatoxin.",
            stageVulnerabilities: [
                { stage: 'Vegetative (0-40 days)', vulnerability: 'Moderate - Disease establishment period' },
                { stage: 'Pegging (40-70 days)', vulnerability: 'Very High - Moisture stress prevents peg penetration' },
                { stage: 'Pod Development (70-110 days)', vulnerability: 'Very High - Continuous water demand and disease pressure' },
                { stage: 'Maturity (110-130 days)', vulnerability: 'High - Harvest timing affects quality and aflatoxin risk' }
            ]
        }
    };

    const mockChartData = [
        { period: 'Week 1-2', Cotton: 25, Soybean: 20, Maize: 18, Groundnut: 30 },
        { period: 'Week 3-4', Cotton: 30, Soybean: 22, Maize: 20, Groundnut: 35 },
        { period: 'Week 5-6', Cotton: 45, Soybean: 35, Maize: 25, Groundnut: 50 },
        { period: 'Week 7-8', Cotton: 65, Soybean: 55, Maize: 70, Groundnut: 65 },
        { period: 'Week 9-10', Cotton: 75, Soybean: 60, Maize: 45, Groundnut: 75 },
        { period: 'Week 11-12', Cotton: 70, Soybean: 50, Maize: 35, Groundnut: 80 },
        { period: 'Week 13-14', Cotton: 55, Soybean: 40, Maize: 25, Groundnut: 70 },
        { period: 'Week 15-16', Cotton: 40, Soybean: 30, Maize: 20, Groundnut: 65 }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.latitude || isNaN(formData?.latitude)) {
            newErrors.latitude = 'Valid latitude required';
        }
        if (!formData?.longitude || isNaN(formData?.longitude)) {
            newErrors.longitude = 'Valid longitude required';
        }
        if (!formData?.farmArea || parseFloat(formData?.farmArea) <= 0) {
            newErrors.farmArea = 'Farm area must be greater than 0';
        }
        if (!formData?.soilType) {
            newErrors.soilType = 'Soil type selection required';
        }
        if (!formData?.waterSource) {
            newErrors.waterSource = 'Water source selection required';
        }
        if (!formData?.waterAvailability) {
            newErrors.waterAvailability = 'Water availability assessment required';
        }
        if (!formData?.season) {
            newErrors.season = 'Season selection required';
        }
        if (!formData?.selectedCrops || formData?.selectedCrops?.length < 2) {
            newErrors.selectedCrops = 'Select at least 2 crops for comparison';
        }
        if (formData?.selectedCrops && formData?.selectedCrops?.length > 5) {
            newErrors.selectedCrops = 'Maximum 5 crops allowed for comparison';
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleAnalyze = () => {
        if (!validateForm()) {
            return;
        }

        setIsAnalyzing(true);

        setTimeout(() => {
            const filteredResults = mockAnalysisResults?.filter(result =>
                formData?.selectedCrops?.includes(result?.cropName?.toLowerCase()?.replace(/\s+/g, '-'))
            );

            setAnalysisResults(filteredResults);
            setIsAnalyzing(false);

            window.scrollTo({ top: document.getElementById('results-section')?.offsetTop - 100, behavior: 'smooth' });
        }, 2000);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Assessment saved successfully. You can access it from the dashboard.');
        }, 1500);
    };

    const handleExport = () => {
        const reportData = {
            timestamp: new Date()?.toISOString(),
            location: { latitude: formData?.latitude, longitude: formData?.longitude },
            farmDetails: { area: formData?.farmArea, elevation: formData?.elevation },
            soilWater: { soilType: formData?.soilType, waterSource: formData?.waterSource, waterAvailability: formData?.waterAvailability },
            season: formData?.season,
            analysisResults: analysisResults
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `risk-analysis-${Date.now()}.json`;
        link?.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setFormData({
            latitude: '',
            longitude: '',
            farmArea: '',
            elevation: '',
            soilType: '',
            waterSource: '',
            waterAvailability: '',
            season: '',
            selectedCrops: []
        });
        setErrors({});
        setAnalysisResults(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getCropDisplayName = (cropValue) => {
        const cropMap = {
            'cotton': 'Cotton',
            'wheat': 'Wheat',
            'rice': 'Rice',
            'maize': 'Maize',
            'soybean': 'Soybean',
            'groundnut': 'Groundnut',
            'sugarcane': 'Sugarcane',
            'chickpea': 'Chickpea',
            'pigeon-pea': 'Pigeon Pea',
            'tomato': 'Tomato',
            'onion': 'Onion',
            'potato': 'Potato'
        };
        return cropMap?.[cropValue] || cropValue;
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <NavigationBreadcrumb />
            <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Pre-Sowing Risk Analysis</h1>
                        <p className="text-base md:text-lg text-muted-foreground">
                            Evaluate crop options and make informed planting decisions based on comprehensive risk assessment
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-6">
                            <LocationInputForm
                                formData={formData}
                                onChange={setFormData}
                                errors={errors}
                            />
                            <SoilWaterInputForm
                                formData={formData}
                                onChange={setFormData}
                                errors={errors}
                            />
                        </div>

                        <div className="space-y-6">
                            <SeasonCropInputForm
                                formData={formData}
                                onChange={setFormData}
                                errors={errors}
                            />

                            <div className="bg-card rounded-lg p-4 md:p-6 shadow-md">
                                <Button
                                    variant="default"
                                    iconName="LineChart"
                                    iconPosition="left"
                                    onClick={handleAnalyze}
                                    loading={isAnalyzing}
                                    fullWidth
                                    size="lg"
                                >
                                    {isAnalyzing ? 'Analyzing Risk Patterns...' : 'Analyze Risk'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {analysisResults && (
                        <div id="results-section" className="space-y-6">
                            <div className="flex items-center gap-3 pt-6 border-t border-border">
                                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                                    <Icon name="CheckCircle2" size={24} className="text-success" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Analysis Complete</h2>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        Comparative risk assessment for {analysisResults?.length} selected crops
                                    </p>
                                </div>
                            </div>

                            <RiskComparisonTable analysisResults={analysisResults} />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {analysisResults?.map((result) => (
                                    <RiskExplanationCard
                                        key={result?.cropName}
                                        crop={result}
                                        explanation={mockExplanations?.[result?.cropName]}
                                    />
                                ))}
                            </div>

                            <SeasonalRiskChart
                                chartData={mockChartData}
                                selectedCrops={formData?.selectedCrops?.map(getCropDisplayName)}
                            />

                            <AnalysisActions
                                onSave={handleSave}
                                onExport={handleExport}
                                onReset={handleReset}
                                hasResults={!!analysisResults}
                                isSaving={isSaving}
                            />
                        </div>
                    )}
                </div>
            </main>
            <QuickActionToolbar />
        </div>
    );
};

export default PreSowingRiskAnalysis;