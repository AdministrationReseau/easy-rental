'use client'

import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Slider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: {  } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  paddingLeft: theme.spacing(2),
  textAlign: 'left',
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

interface FilterProps {
}


export default function Filter({}: FilterProps) {
    const [value, setValue] = useState<number>(0);
    let [price, setPrice] = useState<number>(0);

    const dPrice = 5000;

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        setPrice(dPrice * (newValue as number));
    };

    const checkboxesFilters = [
        {
            'name': 'filter 1',
            'elements': ['Item 1-1', 'Item 1-2', 'Item 1-3'],
        },
        {
            'name': 'filter 2',
            'elements': ['Item 2-1', 'Item 2-2', 'Item 2-3', 'Item 2-4'],
        },
    ]

    const slidesFilters = [
        {
            'name': 'slider 1',
            'min': 0,
            'max': 1_000_000,
        },
    ];
    
    return (
        <form action="" className='w-[300px] m-4 p-4 shadow-sm shadow-primary-blue'>
            {checkboxesFilters.map((filter, filterIndex) => {
                const name = filter.name;
                const elements = filter.elements;

                return (
                    <fieldset className='mb-8 border border-green-text/10 border-b-black' key={filterIndex}>
                        <legend className='uppercase text-xs text-primary-blue'>FILTER 1</legend>
                        <Stack>
                            {elements.map((element, elementIndex) => {
                                return (
                                    <Item key={elementIndex}>
                                        <Checkbox {...label} color='green' id={element} />
                                        <label htmlFor={element} className='select-none hover:cursor-pointer'>{element}</label>
                                    </Item>
                                );
                            })}
                        </Stack>
                    </fieldset>
                );
            })}

            {slidesFilters.map((filter, filterIndex) => {
                return (
                    <fieldset className='mb-8' key={filterIndex}>
                        <legend className='uppercase text-xs text-primary-blue'>{filter.name}</legend>
                        <Stack>
                            <Slider color='blue' aria-label="Price" value={value} onChange={handleChange} />

                            <div className=''>Max: {new Intl.NumberFormat('fr-FR').format(price)} FCFA</div>
                        </Stack>
                    </fieldset>  
                );
            })}
        </form>
    );
}
