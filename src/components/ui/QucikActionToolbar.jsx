import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const QuickActionToolbar = () => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    const analyticalPaths = [
        '/pre-sowing-risk-analysis',
        '/stage-aware-risk-monitor',
        '/risk-alert-details'
    ];

    const shouldShow = analyticalPaths?.includes(location?.pathname);

    if (!shouldShow) return null;

    const actions = [
        {
            icon: 'Download',
            label: 'Export Report',
            onClick: () => console.log('Export report'),
            variant: 'outline'
        },
        {
            icon: 'Save',
            label: 'Save Assessment',
            onClick: () => console.log('Save assessment'),
            variant: 'outline'
        },
        {
            icon: 'GitCompare',
            label: 'Compare Crops',
            onClick: () => console.log('Compare crops'),
            variant: 'outline'
        }
    ];

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="quick-action-toolbar hidden md:flex">
                {actions?.map((action) => (
                    <button
                        key={action?.label}
                        className="quick-action-button"
                        onClick={action?.onClick}
                        title={action?.label}
                        aria-label={action?.label}
                    >
                        <Icon name={action?.icon} size={20} />
                    </button>
                ))}
            </div>
            <div className="quick-action-toolbar md:hidden">
                {isExpanded ? (
                    <>
                        {actions?.map((action) => (
                            <button
                                key={action?.label}
                                className="quick-action-button"
                                onClick={() => {
                                    action?.onClick();
                                    setIsExpanded(false);
                                }}
                                title={action?.label}
                                aria-label={action?.label}
                            >
                                <Icon name={action?.icon} size={20} />
                            </button>
                        ))}
                        <button
                            className="quick-action-button"
                            onClick={handleToggleExpand}
                            aria-label="Close actions"
                        >
                            <Icon name="X" size={20} />
                        </button>
                    </>
                ) : (
                    <button
                        className="quick-action-button"
                        onClick={handleToggleExpand}
                        aria-label="Open actions"
                    >
                        <Icon name="MoreVertical" size={20} />
                    </button>
                )}
            </div>
        </>
    );
};

export default QuickActionToolbar;