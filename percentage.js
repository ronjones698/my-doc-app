import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

class Percentages {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  WidthPercentage(percentage) {
    const decimal = percentage / 100;
    return Math.trunc(decimal * this.width);
  }
  HeightPercentage(percentage) {
    const decimal = percentage / 100;
    return Math.trunc(decimal * this.height);
  }
}

const PercentageObject = new Percentages(width, height);

export default PercentageObject;
