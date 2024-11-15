'use client'

import React, { useState } from 'react';
import { CustomAlert } from '@/components/Alert'
import { CustomCheckbox } from '@/components/Checkbox'

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
                </div>
            </main>
        </div>
    );
}
