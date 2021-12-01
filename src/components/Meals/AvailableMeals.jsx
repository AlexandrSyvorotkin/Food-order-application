import React, {useEffect, useState} from 'react';
import styles from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(()=> {
        const fetchMeals = async () => {

            const response =
                await fetch('https://food-order-app-2b4d1-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }


            const responseData = await response.json()
            const loadedMeals = []

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }

            setMeals(loadedMeals)
            setIsLoading(false)
        }


            fetchMeals().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })

    }, [])

    if (isLoading) {
        return <section className={styles.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={styles.MealsError}>{httpError}</section>
    }


    const mealList = meals.map(meal => {
        return <MealItem id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
    })

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
