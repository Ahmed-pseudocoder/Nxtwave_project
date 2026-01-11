import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RiskWindowCard = ({ risk, onViewDetails }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical':
                return 'text-error bg-error/10 border-error';
            case 'high':
                return 'text-warning bg-warning/10 border-warning';
            case 'medium':
                return 'text-accent bg-accent/10 border-accent';
            default:
                return 'text-muted-foreground bg-muted border-border';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return 'AlertOctagon';
            case 'high':
                return 'AlertTriangle';
            case 'medium':
                return 'AlertCircle';
            default:
                return 'Info';
        }
    };

    const getRiskTypeIcon = (type) => {
        switch (type) {
            case 'pest':
                return 'Bug';
            case 'disease':
                return 'Virus';
            case 'weather':
                return 'CloudRain';
            case 'operation':
                return 'Wrench';
            default:
                return 'AlertCircle';
        }
    };

    return (
        <div className={`bg-card rounded-lg border-2 overflow-hidden transition-smooth hover:elevation-2 ${getSeverityColor(risk?.severity)}`}>
            <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${risk?.severity === 'critical' ? 'bg-error' :
                                risk?.severity === 'high' ? 'bg-warning' : 'bg-accent'
                            }`}>
                            <Icon
                                name={getRiskTypeIcon(risk?.type)}
                                size={24}
                                color="#FFFFFF"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-base md:text-lg text-foreground">{risk?.title}</h3>
                                <Icon
                                    name={getSeverityIcon(risk?.severity)}
                                    size={18}
                                    color={risk?.severity === 'critical' ? 'var(--color-error)' :
                                        risk?.severity === 'high' ? 'var(--color-warning)' : 'var(--color-accent)'}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">{risk?.type} threat</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getSeverityColor(risk?.severity)}`}>
                            {risk?.severity}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{risk?.daysRemaining}d left</span>
                    </div>
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-3">{risk?.description}</p>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-muted-foreground">Window: {risk?.startDate} - {risk?.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="Target" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-muted-foreground">Confidence: {risk?.confidence}%</span>
                    </div>
                    {risk?.affectedArea && (
                        <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-muted-foreground">{risk?.affectedArea}</span>
                        </div>
                    )}
                </div>

                {risk?.image && (
                    <div className="mb-4 rounded-lg overflow-hidden h-40 md:h-48">
                        <Image
                            src={risk?.image}
                            alt={risk?.imageAlt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">Updated {risk?.lastUpdated}</span>
                    </div>
                    <button
                        onClick={() => onViewDetails(risk)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth"
                    >
                        <span>View Details</span>
                        <Icon name="ArrowRight" size={16} color="#FFFFFF" />
                    </button>
                </div>
            </div>
            {risk?.daysRemaining <= 3 && (
                <div className="bg-error/10 px-4 py-2 border-t border-error/20">
                    <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} color="var(--color-error)" />
                        <span className="text-sm font-medium text-error">Urgent: Action required within {risk?.daysRemaining} days</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RiskWindowCard;