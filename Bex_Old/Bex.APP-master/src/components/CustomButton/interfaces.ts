import { Colors } from "../../constants/Colors";

export interface ButtonProps {
    icon?: string
    onPress?: () => void
    type?: string
    iconColor?: Colors
}