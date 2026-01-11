
import React from 'react';
import Icon from '../../../components/AppIcon';

const CropStageSelector = ({ selectedStage, onStageChange, stages }) => {
    return (
        <div className="bg-card rounded-lg p-4 md:p-6 elevation-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Sprout" size={20} color="var(--color-primary)" />
                </div>
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-foreground">Current Crop Stage</h2>
                    <p className="text-sm text-muted-foreground">Select active growth phase for monitoring</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stages?.map((stage) => (
                    <button
                        key={stage?.id}
                        onClick={() => onStageChange(stage?.id)}
                        className={`p-4 rounded-lg border-2 transition-smooth text-left ${selectedStage === stage?.id
                                ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedStage === stage?.id ? 'bg-primary' : 'bg-muted'
                                }`}>
                                <Icon
                                    name={stage?.icon}
                                    size={20}
                                    color={selectedStage === stage?.id ? '#FFFFFF' : 'var(--color-foreground)'}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">{stage?.name}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{stage?.description}</p>
                                {stage?.activeRisks > 0 && (
                                    <div className="mt-2 flex items-center gap-1">
                                        <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                                        <span className="text-xs font-medium text-warning">{stage?.activeRisks} active risks</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CropStageSelector;