import { StyleSheet, View } from "react-native";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import { useState, useEffect } from "react";
import { FoodItem } from "./FoodItem";
import { AddFoodItem } from "./AddFoodItem";
import { BREAKFAST, generateNumberOfMeals } from "../../utils/meals";
import { toCamelCase } from "../../utils/formatData";
import { daysSource } from "./../../constants/mockData";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import { AddDropDown } from "./AddDropDown";

export const MealList = ({
  dataSource,
  planType,
  setSelectedMeals,
  handleRemoveMeal,
}) => {
  const [mealsList, setMealsList] = useState([]);
  const [dataMeals, setDataMeals] = useState(dataSource);

  const getDataMeals = (data, mealsList) => {
    if (!data) {
      return mealsList.map((meal) => ({
        [meal]: [],
      }));
    }
    const dataMeals = mealsList.map((meal) => ({
      [meal]: data[toCamelCase(meal)],
    }));
    return dataMeals;
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromStorage();
      const meals = generateNumberOfMeals(
        planType === RECOMMEND_TAB ? user.meals : 5
      );
      setMealsList(meals);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDataMeals(getDataMeals(dataSource, mealsList));
  }, [dataSource]);

  const handleRemoveMeals = (meal, date) => {
    const updatedDataMeals = dataMeals.map((mealData) => {
      if (mealData[meal]) {
        return {
          ...mealData,
          [meal]: [],
        };
      }
      return mealData;
    });
    setDataMeals(updatedDataMeals);
    handleRemoveMeal(date);
  };

  return (
    <View style={style.container}>
      {dataMeals &&
        dataMeals.length !== 0 &&
        dataMeals.map((meal, index) => (
          <View key={index}>
            {planType === CUSTOM_TAB ? (
              <View className="mx-[30px]">
                <AddDropDown
                  title={mealsList[index]}
                  data={meal[mealsList[index]]}
                  handleRemoveMeals={handleRemoveMeals}
                />
              </View>
            ) : (
              <FoodItem
                item={meal[mealsList[index]]}
                meal={mealsList[index]}
                planType={planType}
              />
            )}
          </View>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
});
