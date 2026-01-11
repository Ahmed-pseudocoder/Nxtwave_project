import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import TrustSignals from './components/TrustSignals';

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <NavigationBreadcrumb />
            <main className="pt-20 pb-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 md:mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-4 md:mb-6">
                            <Icon name="Sprout" size={32} color="var(--color-primary)" />
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
                            Join FarmiGrow
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Create your professional account to access agricultural risk intelligence and stage-aware monitoring services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                        <div className="lg:col-span-2">
                            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 lg:p-10">
                                <ProgressIndicator currentStep={currentStep} totalSteps={3} />
                                <RegistrationForm />

                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
                                    <p className="text-center text-sm md:text-base text-muted-foreground">
                                        Already have an account?{' '}
                                        <Link
                                            to="/farm-dashboard"
                                            className="text-primary font-medium hover:underline"
                                        >
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6 md:space-y-8 sticky top-24">
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Icon name="Info" size={20} color="var(--color-primary)" />
                                        Why Register?
                                    </h3>
                                    <ul className="space-y-3 md:space-y-4">
                                        {[
                                            'Pre-sowing crop risk assessment',
                                            'Stage-aware risk window alerts',
                                            'AI-powered risk intelligence',
                                            'Batch analysis for multiple farms',
                                            'Downloadable risk reports',
                                            'Regional risk insights'
                                        ]?.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Icon
                                                    name="CheckCircle2"
                                                    size={18}
                                                    color="var(--color-success)"
                                                    className="flex-shrink-0 mt-0.5"
                                                />
                                                <span className="text-sm md:text-base text-foreground">
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <h4 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
                                        <Icon name="Shield" size={18} color="var(--color-primary)" />
                                        Data Security
                                    </h4>
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                        Your agricultural data is encrypted and protected. We never share your information without consent. All risk assessments are confidential.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <h4 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
                                        <Icon name="HelpCircle" size={18} color="var(--color-primary)" />
                                        Need Help?
                                    </h4>
                                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                                        Contact our support team for assistance with registration or technical questions.
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href="mailto:support@farmigrow.com"
                                            className="text-xs md:text-sm text-primary hover:underline flex items-center gap-2"
                                        >
                                            <Icon name="Mail" size={14} />
                                            support@farmigrow.com
                                        </a>
                                        <a
                                            href="tel:+918765432109"
                                            className="text-xs md:text-sm text-primary hover:underline flex items-center gap-2"
                                        >
                                            <Icon name="Phone" size={14} />
                                            +91 87654 32109
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 md:mt-16 lg:mt-20">
                        <TrustSignals />
                    </div>

                    <div className="mt-12 md:mt-16 text-center">
                        <p className="text-xs md:text-sm text-muted-foreground">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="text-primary hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-primary hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </main>
            <footer className="bg-card border-t border-border py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary">
                                <Icon name="Sprout" size={20} color="#FFFFFF" />
                            </div>
                            <span className="text-sm md:text-base font-semibold text-foreground">
                                FarmiGrow
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">
                            © {new Date()?.getFullYear()} FarmiGrow. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Register;