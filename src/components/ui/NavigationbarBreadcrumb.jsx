import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = () => {
    const location = useLocation();

    const breadcrumbMap = {
        '/farm-dashboard': [{ label: 'Dashboard', path: '/farm-dashboard' }],
        '/register': [{ label: 'Register', path: '/register' }],
        '/pre-sowing-risk-analysis': [
            { label: 'Dashboard', path: '/farm-dashboard' },
            { label: 'Risk Analysis', path: '/pre-sowing-risk-analysis' }
        ],
        '/stage-aware-risk-monitor': [
            { label: 'Dashboard', path: '/farm-dashboard' },
            { label: 'Monitoring', path: '/stage-aware-risk-monitor' }
        ],
        '/risk-alert-details': [
            { label: 'Dashboard', path: '/farm-dashboard' },
            { label: 'Monitoring', path: '/stage-aware-risk-monitor' },
            { label: 'Alert Details', path: '/risk-alert-details' }
        ]
    };

    const breadcrumbs = breadcrumbMap?.[location?.pathname] || [];

    if (breadcrumbs?.length <= 1) return null;

    return (
        <nav className="breadcrumb-container" aria-label="Breadcrumb">
            {breadcrumbs?.map((crumb, index) => {
                const isLast = index === breadcrumbs?.length - 1;

                return (
                    <React.Fragment key={crumb?.path}>
                        {index > 0 && (
                            <Icon
                                name="ChevronRight"
                                size={16}
                                className="breadcrumb-separator"
                            />
                        )}
                        {isLast ? (
                            <span className="breadcrumb-item active">
                                {crumb?.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb?.path}
                                className="breadcrumb-item"
                            >
                                {crumb?.label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default NavigationBreadcrumb;