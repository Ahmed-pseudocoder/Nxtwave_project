import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskHeader = ({ alert }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical':
                return 'bg-error/10 text-error border-error/20';
            case 'high':
                return 'bg-warning/10 text-warning border-warning/20';
            case 'medium':
                return 'bg-accent/10 text-accent border-accent/20';
            default:
                return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return 'AlertTriangle';
            case 'high':
                return 'AlertCircle';
            case 'medium':
                return 'Info';
            default:
                return 'CheckCircle';
        }
    };

    return (
        <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
                <div className="flex-1">
                    <div className="flex items-start gap-3 md:gap-4 mb-4">
                        <div className={`p-2 md:p-3 rounded-lg ${getSeverityColor(alert?.severity)}`}>
                            <Icon name={getSeverityIcon(alert?.severity)} size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                                {alert?.title}
                            </h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {alert?.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon name="Sprout" size={16} className="text-primary" />
                                <span className="text-xs md:text-sm text-muted-foreground">Crop</span>
                            </div>
                            <p className="text-sm md:text-base font-semibold text-foreground">{alert?.crop}</p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon name="TrendingUp" size={16} className="text-primary" />
                                <span className="text-xs md:text-sm text-muted-foreground">Stage</span>
                            </div>
                            <p className="text-sm md:text-base font-semibold text-foreground">{alert?.stage}</p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon name="Target" size={16} className="text-primary" />
                                <span className="text-xs md:text-sm text-muted-foreground">Confidence</span>
                            </div>
                            <p className="text-sm md:text-base font-semibold text-foreground">{alert?.confidence}%</p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 md:p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon name="Clock" size={16} className="text-error" />
                                <span className="text-xs md:text-sm text-muted-foreground">Time Left</span>
                            </div>
                            <p className="text-sm md:text-base font-semibold text-error">{alert?.timeRemaining}</p>
                        </div>
                    </div>
                </div>

                <div className={`px-4 py-2 md:px-5 md:py-3 rounded-lg border-2 ${getSeverityColor(alert?.severity)} lg:min-w-[140px] text-center`}>
                    <p className="text-xs md:text-sm font-medium uppercase tracking-wide">
                        {alert?.severity} Risk
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RiskHeader;