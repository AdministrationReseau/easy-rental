'use client'

import React, { useState } from 'react';
import { CustomAlert } from '@/components/Alert'
import { CustomCheckbox } from '@/components/Checkbox'
import Field from '@/components/base-component/fields';
import AgencyDetail from '@/components/combiner-components/agency-detail';
import CarDetailPage from '@/components/combiner-components/car-details';
import TransactionsPage from '@/components/base-component/transaction';

export default function Test() {

    const [checked, setChecked] = useState(false);

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    return (
        <div>
            <main>
                <div>
                    <CustomAlert message="hellloooooooo guyssss" type='warning' width="w-full sm:w-[300px] md:w-[500px] lg:w-[700px] xl:w-[900px]"/>

                    <CustomCheckbox label="Agree to terms" checked={checked} onChange={handleCheck}/>
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
     
                  <Field
                    label="Last name"
                    placeholder="Enter your last name"
                    size="w-full xl:w-1/2"
                  />
                </div>
                <Field
                  label="Email"
                  type="password"
                  placeholder="Enter your email address"
                  required
                />
                <Field
                  label="Subject"
                  placeholder="Select subject"
                />
              
                </div>
                
                <AgencyDetail/>
                <CarDetailPage/>
                <TransactionsPage/>
            </main>
            
        </div>
    );
}
