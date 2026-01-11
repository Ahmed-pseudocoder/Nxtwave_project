import React from 'react';
import Icon from '../../../components/AppIconTemp';

const RiskTimeline = ({ timeline }) => {
    return (
        <div className="bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Icon name="Clock" size={24} className="text-primary" />
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                    Risk Duration & Critical Windows
                </h2>
            </div>
            <div className="space-y-4 md:space-y-6">
                {timeline?.map((event, index) => (
                    <div key={index} className="relative pl-8 md:pl-10 pb-6 md:pb-8 last:pb-0">
                        {index !== timeline?.length - 1 && (
                            <div className="absolute left-[15px] md:left-[19px] top-8 bottom-0 w-0.5 bg-border" />
                        )}

                        <div className={`absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${event?.critical ? 'bg-error text-error-foreground' : 'bg-primary text-primary-foreground'
                            }`}>
                            <Icon name={event?.critical ? 'AlertTriangle' : 'Calendar'} size={16} className="md:w-5 md:h-5" />
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 md:p-4 lg:p-5">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-3">
                                <h3 className="text-base md:text-lg font-semibold text-foreground">
                                    {event?.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                                        {event?.date}
                                    </span>
                                    {event?.critical && (
                                        <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded">
                                            Critical
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm md:text-base text-muted-foreground mb-3">
                                {event?.description}
                            </p>

                            {event?.actions && event?.actions?.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs md:text-sm font-medium text-foreground">
                                        Recommended Actions:
                                    </p>
                                    <ul className="space-y-1.5">
                                        {event?.actions?.map((action, actionIndex) => (
                                            <li key={actionIndex} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                                                <Icon name="ChevronRight" size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                                                <span>{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskTimeline;