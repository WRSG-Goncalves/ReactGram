import { Dimensions, Platform, PixelRatio } from "react-native";
import { MessageType, showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get("window");

const scale = width / 375;

export const normalize = (size: number): number => {
  const newSize = size * scale;

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const monetize = (val: string): string => {
  
  if(!val){
    return 'R$'
  }
    
  return `R$ ${parseFloat(val).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
 
}

export const showAlertMessage = (message: string, type: MessageType) => {
  return showMessage({
    message: message,
    type: type,
  });
  
}

export const sortAlphabetically = (arr: Array<any>, type: string) => {
  return arr?.sort((a,b) => a?.[type]?.toLowerCase()?.localeCompare(b?.[type]?.toLowerCase()))
}