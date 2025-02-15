import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {PaymentConfig, PaymentMethod} from "@/utils/types/payment";

interface PaymentCardProps {
    title: string;
    icon: React.ReactNode;
    method: PaymentMethod;
    config: PaymentConfig;
    onUpdate: (method: PaymentMethod, merchantId: string, enabled: boolean) => void;
}

const PaymentMethodCard = ({ title, icon, method, config, onUpdate }: PaymentCardProps) => {
    const [merchantId, setMerchantId] = useState(config.paymentMethods[method]?.merchantId || '');
    const [enabled, setEnabled] = useState(config.paymentMethods[method]?.enabled || false);

    const handleUpdate = () => {
        const newEnabled = !enabled;
        setEnabled(newEnabled);
        onUpdate(method, merchantId, newEnabled);
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={enabled}
                            onChange={handleUpdate}
                        />
                        <span>Activer {title}</span>
                    </div>
                    <Input
                        type="text"
                        placeholder="ID Marchand"
                        value={merchantId}
                        onChange={(e) => {
                            setMerchantId(e.target.value);
                            onUpdate(method, e.target.value, enabled);
                        }}
                        disabled={!enabled}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export {PaymentMethodCard};
