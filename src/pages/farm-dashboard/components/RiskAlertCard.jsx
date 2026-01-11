import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RiskAlertCard = ({ alert }) => {
    const navigate = useNavigate();

    const getSeverityStyles = (severity) => {
        const styles = {
            critical: 'bg-error/10 border-error text-error',
            warning: 'bg-warning/10 border-warning text-warning',
            info: 'bg-primary/10 border-primary text-primary'
        };
        return styles?.[severity] || styles?.info;
    };

    const getSeverityIcon = (severity) => {
        const icons = {
            critical: 'AlertTriangle',
            warning: 'AlertCircle',
            info: 'Info'
        };
        return icons?.[severity] || 'Info';
    };

    const handleViewDetails = () => {
        navigate('/risk-alert-details', { state: { alert } });
    };

    return (
        <div className="bg-card rounded-lg border border-border p-4 md:p-6 hover:shadow-md transition-smooth">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-md ${getSeverityStyles(alert?.severity)}`}>
                        <Icon name={getSeverityIcon(alert?.severity)} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 text-truncate">
                            {alert?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {alert?.cropName} • {alert?.stage}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityStyles(alert?.severity)}`}>
                        {alert?.severity?.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {alert?.daysRemaining}d left
                    </span>
                </div>
            </div>
            <p className="text-sm text-foreground mb-4 line-clamp-3">
                {alert?.description}
            </p>
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Icon name="Target" size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground data-text">
                            {alert?.confidence}%
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            {alert?.location}
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleViewDetails}
                >
                    Details
                </Button>
            </div>
        </div>
    );
};

export default RiskAlertCard;