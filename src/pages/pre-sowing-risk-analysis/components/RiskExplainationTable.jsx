import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RiskExplanationCard = ({ crop, explanation }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-card rounded-lg p-4 md:p-6 border border-border hover:shadow-md transition-smooth">
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Sprout" size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{crop?.cropName}</h3>
                        <p className="text-sm text-muted-foreground">{crop?.variety}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-md hover:bg-muted transition-smooth"
                    aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                    <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
                </button>
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Risk Level:</span>
                    <span className={`text-sm font-semibold ${crop?.riskLevel === 'Low' || crop?.riskLevel === 'Very Low' ? 'text-success' : crop?.riskLevel === 'Moderate' ? 'text-warning' : 'text-error'}`}>
                        {crop?.riskLevel}
                    </span>
                </div>

                <p className="text-sm text-foreground leading-relaxed">
                    {explanation?.summary}
                </p>

                {isExpanded && (
                    <div className="space-y-4 pt-3 border-t border-border">
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="TrendingUp" size={16} className="text-success" />
                                Favorable Factors
                            </h4>
                            <ul className="space-y-1.5">
                                {explanation?.favorableFactors?.map((factor, idx) => (
                                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                                        <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                                        <span>{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="AlertTriangle" size={16} className="text-warning" />
                                Risk Factors
                            </h4>
                            <ul className="space-y-1.5">
                                {explanation?.riskFactors?.map((factor, idx) => (
                                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                                        <Icon name="AlertCircle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                                        <span>{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="Clock" size={16} className="text-primary" />
                                Timing Sensitivity
                            </h4>
                            <p className="text-sm text-foreground">{explanation?.timingSensitivity}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Icon name="Target" size={16} className="text-accent" />
                                Stage-Specific Vulnerabilities
                            </h4>
                            <div className="space-y-2">
                                {explanation?.stageVulnerabilities?.map((stage, idx) => (
                                    <div key={idx} className="bg-muted/50 rounded-md p-3">
                                        <p className="text-sm font-medium text-foreground mb-1">{stage?.stage}</p>
                                        <p className="text-sm text-muted-foreground">{stage?.vulnerability}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiskExplanationCard;