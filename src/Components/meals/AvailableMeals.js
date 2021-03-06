import Card from "../UI/Card";
//import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import axios from "axios";
import React, { useState } from "react";

const API_URL = "https://api.shilpimultiplex.com/api/Product/Index/";
//a81c54b9-b10d-428f-b721-9398a97af022

export default function AvailableMeals(props) {
  const [data, setData] = useState([]);
  axios
    .get(API_URL + props.Uid)
    .then(function (result) {
      setData(result.data);
    });
  console.log(data);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {data.map((meal) => (
            <li className={classes.meal}>
              <div>
                <h3>{meal.productName}</h3>
                <img src={meal.imagePath} alt="..." />
                <div className={classes.description}>{meal.desc}</div>
                <div className={classes.price}>{meal.price}$</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
