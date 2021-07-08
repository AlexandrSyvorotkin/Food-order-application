import React from 'react';
import styles from './MealFrom.module.css'
import Input from "../../UI/Input";

const MealForm = () => {
    return (
        <from className={styles.form}>
            <Input label='Amount' input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }
            }/>
            <button> + Add</button>
        </from>
    );
};

export default MealForm;