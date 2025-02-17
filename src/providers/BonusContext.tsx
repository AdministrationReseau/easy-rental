'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export interface BonusConfig {
  basePointsPerAmount: number; // e.g., 1 point per $10
  loyaltyMultiplier: number; // e.g., 1.5x points for loyal customers
  description: string; // Admin's description of the calculation method
}

interface BonusContextType {
  bonusConfig: BonusConfig;
  updateBonusConfig: (config: BonusConfig) => void;
  calculateBonus: (amount: number) => number;
}

const defaultConfig: BonusConfig = {
  basePointsPerAmount: 10, // 1 point per $10
  loyaltyMultiplier: 1.5,
  description: 'Base points: 1 point per $10 spent\nLoyalty multiplier: 1.5x points'
};

const BonusContext = createContext<BonusContextType | undefined>(undefined);

export function BonusProvider({ children }: { children: ReactNode }) {
  const [bonusConfig, setBonusConfig] = useState<BonusConfig>(defaultConfig);

  const calculateBonus = (amount: number): number => {
    const basePoints = Math.floor(amount / bonusConfig.basePointsPerAmount);
    return Math.floor(basePoints * bonusConfig.loyaltyMultiplier);
  };

  const updateBonusConfig = (config: BonusConfig) => {
    setBonusConfig(config);
  };

  return (
    <BonusContext.Provider value={{ bonusConfig, updateBonusConfig, calculateBonus }}>
      {children}
    </BonusContext.Provider>
  );
}

export function useBonus() {
  const context = useContext(BonusContext);
  if (!context) {
    throw new Error('useBonus must be used within a BonusProvider');
  }
  return context;
}