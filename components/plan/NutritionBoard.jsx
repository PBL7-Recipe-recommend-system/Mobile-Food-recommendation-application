import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";

export const NutritionBoard = () => {
  return (
    <View style={style.container}>
      <Text style={style.nutritionText}>Nutrition value</Text>
      <View style={style.content}>
        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#957DC9"}
            progress={10}
            duration={100}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Calories</Text>
        </View>

        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#86BA32"}
            progress={10}
            duration={100}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Protein</Text>
        </View>

        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#AD5523"}
            progress={10}
            duration={100}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Fat</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Text style={style.nutritionText}>Total:</Text>
        <Text style={style.nutritionText}>1982 kcal</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  nutritionText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
