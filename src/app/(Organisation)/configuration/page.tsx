"use client";
import { useState } from 'react';
import { PaymentConfig, PaymentMethod } from '@/utils/types/payment';
import { PaymentMethodCard } from '@/components/PaymentMethodCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/switch';
import {
    CreditCard,
    Phone,
    User,
    Settings,
    CreditCard as PaymentIcon,
    Key,
    UserPlus,
    Lock,
    Car,
    UserCog
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [config, setConfig] = useState<PaymentConfig>({
        apiKey: '',
        transactionUrl: '',
        userId: '',
        paymentMethods: {}
    });

    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+237600000000',
        company: 'Location Auto Express',
        position: 'Gérant'
    });

    const [rentalConfig, setRentalConfig] = useState({
        withDriverEnabled: true,
        withoutDriverEnabled: true,
        minRentalDuration: 1,
        maxRentalDuration: 30,
        advanceBookingDays: 2,
        depositRequired: true,
        depositPercentage: 30,
        allowLateReturn: true,
        lateReturnFee: 20,
        includeInsurance: true,
        requireDriverLicense: true,
        minimumDriverAge: 21
    });

    const updatePaymentMethod = (method: PaymentMethod, merchantId: string, enabled: boolean) => {
        setConfig(prev => ({
            ...prev,
            paymentMethods: {
                ...prev.paymentMethods,
                [method]: { merchantId, enabled }
            }
        }));
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Paramètres</h1>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 bg-transparent">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-white data-[state=active]:border-primary-blue border-2 data-[state=active]:shadow-md"
                        >
                            <User className="mr-2 h-4 w-4" />
                            Profil
                        </TabsTrigger>
                        <TabsTrigger
                            value="payment"
                            className="data-[state=active]:bg-white data-[state=active]:border-primary-blue border-2 data-[state=active]:shadow-md"
                        >
                            <PaymentIcon className="mr-2 h-4 w-4" />
                            Paiement
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="data-[state=active]:bg-white data-[state=active]:border-primary-blue border-2 data-[state=active]:shadow-md"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Configuration
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="mr-2 h-5 w-5" />
                                        Informations Personnelles
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Prénom</label>
                                            <Input
                                                value={profile.firstName}
                                                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Nom</label>
                                            <Input
                                                value={profile.lastName}
                                                onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <Input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Téléphone</label>
                                        <Input
                                            value={profile.phone}
                                            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                    <Button className="w-full">Mettre à jour le profil</Button>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Lock className="mr-2 h-5 w-5" />
                                            Changer le mot de passe
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Mot de passe actuel</label>
                                            <Input type="password" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Nouveau mot de passe</label>
                                            <Input type="password" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Confirmer le mot de passe</label>
                                            <Input type="password" />
                                        </div>
                                        <Button className="w-full">Changer le mot de passe</Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <UserPlus className="mr-2 h-5 w-5" />
                                            Informations Supplémentaires
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Entreprise</label>
                                            <Input
                                                value={profile.company}
                                                onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Poste</label>
                                            <Input
                                                value={profile.position}
                                                onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                                            />
                                        </div>
                                        <Button className="w-full">Sauvegarder</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="payment">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Key className="mr-2 h-5 w-5" />
                                        Configuration Générale
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Clé API</label>
                                        <Input
                                            type="text"
                                            value={config.apiKey}
                                            onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                                            placeholder="Votre clé API"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">URL de Transaction</label>
                                        <Input
                                            type="text"
                                            value={config.transactionUrl}
                                            onChange={(e) => setConfig(prev => ({ ...prev, transactionUrl: e.target.value }))}
                                            placeholder="URL de l'API de transaction"
                                        />
                                    </div>
                                    <Button className="w-full">Sauvegarder</Button>
                                </CardContent>
                            </Card>

                            <div className="space-y-4">
                                <PaymentMethodCard
                                    title="MTN Money"
                                    icon={<Phone className="h-5 w-5" />}
                                    method="mtn"
                                    config={config}
                                    onUpdate={updatePaymentMethod}
                                />
                                <PaymentMethodCard
                                    title="Orange Money"
                                    icon={<Phone className="h-5 w-5" />}
                                    method="orange"
                                    config={config}
                                    onUpdate={updatePaymentMethod}
                                />
                                <PaymentMethodCard
                                    title="Carte Bancaire"
                                    icon={<CreditCard className="h-5 w-5" />}
                                    method="card"
                                    config={config}
                                    onUpdate={updatePaymentMethod}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Car className="mr-2 h-5 w-5" />
                                        Configuration de Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Location avec chauffeur</label>
                                            <p className="text-sm text-gray-500">Activer la location avec chauffeur</p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.withDriverEnabled}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, withDriverEnabled: checked }))
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Location sans chauffeur</label>
                                            <p className="text-sm text-gray-500">Activer la location sans chauffeur</p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.withoutDriverEnabled}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, withoutDriverEnabled: checked }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Durée minimale de location (jours)</label>
                                        <Input
                                            type="number"
                                            value={rentalConfig.minRentalDuration}
                                            onChange={(e) => setRentalConfig(prev => ({
                                                ...prev,
                                                minRentalDuration: parseInt(e.target.value)
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Durée maximale de location (jours)</label>
                                        <Input
                                            type="number"
                                            value={rentalConfig.maxRentalDuration}
                                            onChange={(e) => setRentalConfig(prev => ({
                                                ...prev,
                                                maxRentalDuration: parseInt(e.target.value)
                                            }))}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <UserCog className="mr-2 h-5 w-5" />
                                        Politiques et Conditions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Caution obligatoire</label>
                                            <p className="text-sm text-gray-500">Exiger une caution pour chaque location</p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.depositRequired}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, depositRequired: checked }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Pourcentage de caution (%)</label>
                                        <Input
                                            type="number"
                                            value={rentalConfig.depositPercentage}
                                            onChange={(e) => setRentalConfig(prev => ({
                                                ...prev,
                                                depositPercentage: parseInt(e.target.value)
                                            }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Retour tardif</label>
                                            <p className="text-sm text-gray-500">Autoriser le retour tardif avec pénalités</p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.allowLateReturn}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, allowLateReturn: checked }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Pénalité de retard (%/jour)</label>
                                        <Input
                                            type="number"
                                            value={rentalConfig.lateReturnFee}
                                            onChange={(e) => setRentalConfig(prev => ({
                                                ...prev,
                                                lateReturnFee: parseInt(e.target.value)
                                            }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Assurance incluse</label>
                                            <p className="text-sm text-gray-500">Inclure l&#39;assurance dans le prix de location</p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.includeInsurance}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, includeInsurance: checked }))
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <UserCog className="mr-2 h-5 w-5" />
                                        Conditions de Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="text-sm font-medium">Réservation à l&#39;avance (jours)</label>
                                            <Input
                                                type="number"
                                                value={rentalConfig.advanceBookingDays}
                                                onChange={(e) => setRentalConfig(prev => ({
                                                    ...prev,
                                                    advanceBookingDays: parseInt(e.target.value)
                                                }))}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Nombre minimum de jours pour réserver en avance
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Âge minimum du conducteur</label>
                                            <Input
                                                type="number"
                                                value={rentalConfig.minimumDriverAge}
                                                onChange={(e) => setRentalConfig(prev => ({
                                                    ...prev,
                                                    minimumDriverAge: parseInt(e.target.value)
                                                }))}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Âge minimum requis pour la location
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <label className="text-sm font-medium">Permis de conduire obligatoire</label>
                                            <p className="text-sm text-gray-500">
                                                Exiger un permis de conduire valide pour la location
                                            </p>
                                        </div>
                                        <Switch
                                            checked={rentalConfig.requireDriverLicense}
                                            onCheckedChange={(checked) =>
                                                setRentalConfig(prev => ({ ...prev, requireDriverLicense: checked }))
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="md:col-span-2 flex justify-end">
                                <Button size="lg" className="px-8">
                                    Sauvegarder les configurations
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
