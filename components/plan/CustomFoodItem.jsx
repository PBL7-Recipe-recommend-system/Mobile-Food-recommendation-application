import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GRAY_TEXT_COLOR } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import { getDateAddingFromStorage } from "../../utils/asyncStorageUtils";
import { Popup } from "react-native-popup-confirm-toast";
import { toCamelCase } from "../../utils/formatData";
import { getMealPlan, removeRecipeFromPlan } from "../../api/plan";

export const CustomFoodItem = ({ item, meal, planType, handleRemoveMeals }) => {
  const [mealIndex, setMealIndex] = useState(0);
  const [data, setData] = useState(item);
  const navigation = useNavigation();
  const getImage = (obj) => {
    if (planType === RECOMMEND_TAB) {
      return obj.images[0];
    } else return obj.image;
  };

  useEffect(() => {
    setData(item);
  }, [item]);

  const handleDetailClick = () => {
    navigation.navigate("DetailedRecipe", {
      id: item?.recipeId,
      meal: meal,
    });
  };

  const handleLongPress = async () => {
    const date = await getDateAddingFromStorage();
    const param = {
      date: date,
      recipeId: item.recipeId,
      meal: toCamelCase(meal),
    };
    Popup.show({
      type: "confirm",
      title: "Confirm!",
      textBody: "Do you want to delete this meals?",
      buttonText: "Delete",
      confirmText: "Cancel",
      callback: async () => {
        await removeRecipeFromPlan(param);
        await getMealPlan();
        handleRemoveMeals(date);
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
      okButtonStyle: { backgroundColor: "red" },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleDetailClick}
      onLongPress={planType === CUSTOM_TAB ? handleLongPress : null}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {item?.name}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsText}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color="#999"
            />
            <Text
              style={{
                fontSize: 12,
                color: "#999",
                fontWeight: "bold",
              }}
            >
              {item?.totalTime}
            </Text>
          </View>

          <View style={styles.detailsText}>
            <SimpleLineIcons name="fire" size={24} color="#999" />
            <Text
              style={{
                fontSize: 12,
                color: "#999",
                fontWeight: "bold",
              }}
            >
              {item.calories} kcal
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: getImage(item) }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    width: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
    width: "60%",
  },
  title: {
    fontSize: 14,
    fontWeight: "semibold",
    color: GRAY_TEXT_COLOR,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailsContainer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reloadButton: {
    position: "absolute",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
