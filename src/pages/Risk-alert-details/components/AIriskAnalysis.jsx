import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { generateComprehensiveRiskAnalysis } from '../../../services/aiRiskService';

const AIRiskAnalysis = ({ analysis, alertData }) => {
  const [expandedSections, setExpandedSections] = useState({
    pattern: true,
    vulnerability: true,
    signals: true
  });
  const [aiAnalysis, setAiAnalysis] = useState(analysis);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (alertData && !analysis) {
      loadAIAnalysis();
    }
  }, [alertData]);

  const loadAIAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateComprehensiveRiskAnalysis(alertData);
      setAiAnalysis(result);
    } catch (err) {
      console.error('Failed to load AI analysis:', err);
      setError('Failed to generate AI analysis. Using fallback data.');
      setAiAnalysis(analysis);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <Icon name="Brain" size={24} className="text-primary" />
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            AI-Powered Risk Analysis
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-sm text-muted-foreground">Generating AI analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Icon name="Brain" size={24} className="text-primary" />
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          AI-Powered Risk Analysis
        </h2>
      </div>

      {error && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
          <p className="text-sm text-warning">{error}</p>
        </div>
      )}

      <div className="space-y-4 md:space-y-6">
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('pattern')}
            className="w-full flex items-center justify-between p-4 md:p-5 bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Pattern Synthesis & Historical Context
              </h3>
            </div>
            <Icon
              name={expandedSections?.pattern ? 'ChevronUp' : 'ChevronDown'}
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {expandedSections?.pattern && (
            <div className="p-4 md:p-5 space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {aiAnalysis?.patternSynthesis}
              </p>

              <div className="bg-primary/5 border-l-4 border-primary rounded p-3 md:p-4">
                <p className="text-xs md:text-sm font-medium text-primary mb-2">
                  Historical Comparison
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {aiAnalysis?.historicalContext}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('vulnerability')}
            className="w-full flex items-center justify-between p-4 md:p-5 bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={20} className="text-warning" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Stage-Specific Vulnerability Analysis
              </h3>
            </div>
            <Icon
              name={expandedSections?.vulnerability ? 'ChevronUp' : 'ChevronDown'}
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {expandedSections?.vulnerability && (
            <div className="p-4 md:p-5 space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {aiAnalysis?.vulnerabilityExplanation}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {aiAnalysis?.vulnerabilityFactors?.map((factor, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="AlertCircle" size={16} className="mt-0.5 text-warning flex-shrink-0" />
                      <h4 className="text-sm md:text-base font-medium text-foreground">
                        {factor?.title}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {factor?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('signals')}
            className="w-full flex items-center justify-between p-4 md:p-5 bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <Icon name="Activity" size={20} className="text-accent" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Signal-to-Alert Translation
              </h3>
            </div>
            <Icon
              name={expandedSections?.signals ? 'ChevronUp' : 'ChevronDown'}
              size={20}
              className="text-muted-foreground"
            />
          </button>

          {expandedSections?.signals && (
            <div className="p-4 md:p-5 space-y-3 md:space-y-4">
              <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                {aiAnalysis?.signalTranslation}
              </p>

              <div className="space-y-3">
                {aiAnalysis?.signals?.map((signal, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-muted/30 rounded-lg">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${signal?.severity === 'high' ? 'bg-error/10 text-error' :
                        signal?.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                      }`}>
                      <Icon name={signal?.icon} size={16} className="md:w-5 md:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-medium text-foreground mb-1">
                        {signal?.source}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {signal?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm md:text-base font-medium text-warning mb-2">
                Uncertainty Expression
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {aiAnalysis?.uncertaintyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRiskAnalysis;