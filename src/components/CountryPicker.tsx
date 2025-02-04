import React, { useState } from 'react';
import './CountryPicker.css';
import {
  CountryDropdown,
  RegionDropdown,
} from 'react-country-region-selector';

interface CountryPickerStyledProps {
  valueCountry: string;
  valueRegion: string;
  onChangeCountry?: (valueCountry: string) => void; // ici on spécifie que onChange attend une fonction qui prend une chaîne de caractères
  onChangeRegion?: (valueRegion: string) => void;
}


export const CountryPickerStyled = ({ valueCountry, valueRegion, onChangeCountry, onChangeRegion }: CountryPickerStyledProps) => {
  

  return (
    <div className="w-full my-2 h-[50px] ">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="block font-medium mb-1">Country</label>
          <CountryDropdown
            className="w-full rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            value={valueCountry}
            onChange={(e) => {
              if (onChangeCountry) onChangeCountry(e);
            }}
          />
        </div>

        {valueCountry && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select City/Region</label>
            <RegionDropdown
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"
              country={valueCountry}
              value={valueRegion}
              onChange={(e) => {
                if (onChangeRegion) onChangeRegion(e);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const CountryPicker = () => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-0 text-xs">
        <CountryDropdown
          className="country-drop-down"
          value={country}
          onChange={(val) => setCountry(val)}
        />
        <RegionDropdown
          className="region-drop-down"
          country={country}
          value={region}
          onChange={(val) => setRegion(val)}
        />
      </div>
    </div>
  );
};