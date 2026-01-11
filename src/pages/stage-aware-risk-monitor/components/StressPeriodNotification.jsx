import React from 'react';
import Icon from '../../../components/AppIconTemp';

const StressPeriodNotification = ({ stressPeriods }) => {
    if (!stressPeriods || stressPeriods?.length === 0) return null;

    return (
        <div className="bg-card rounded-lg p-4 md:p-6 elevation-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon name="Thermometer" size={20} color="var(--color-accent)" />
                </div>
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-foreground">Stress-Prone Periods</h2>
                    <p className="text-sm text-muted-foreground">Vulnerable timeframes requiring attention</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {stressPeriods?.map((period) => (
                    <div
                        key={period?.id}
                        className="p-4 rounded-lg border-2 border-accent/30 bg-accent/5"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                <Icon name={period?.icon} size={20} color="#FFFFFF" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base text-foreground mb-1">{period?.type}</h3>
                                <p className="text-xs text-muted-foreground">{period?.timeframe}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent">
                                    {period?.severity}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-start gap-2">
                                <Icon name="AlertCircle" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-foreground">{period?.description}</p>
                            </div>
                        </div>

                        <div className="bg-card rounded-md p-3 mb-3">
                            <h4 className="text-xs font-medium text-foreground mb-2">Risk Factors:</h4>
                            <div className="flex flex-wrap gap-2">
                                {period?.factors?.map((factor, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                                    >
                                        {factor}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Icon name="Target" size={14} color="var(--color-muted-foreground)" />
                                <span className="text-xs text-muted-foreground">Confidence: {period?.confidence}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                                <span className="text-xs text-muted-foreground">{period?.duration}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StressPeriodNotification;