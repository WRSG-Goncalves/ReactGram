import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import GlobalStyles from '../../styles/GlobalStyles';

export default StyleSheet.create({
  container: {
      flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: GutterSizes.sm
  },
  representationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  representationDesc: {
    fontSize: 16,
    paddingHorizontal: GutterSizes.sm,
  },
  startRepresentationButton: {
    width: '70%', 
    marginVertical: GutterSizes.sm,
    paddingVertical: 5,
    paddingHorizontal: GutterSizes.sm,
    backgroundColor: Colors.Secondary,
    alignSelf: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.White,
    textAlign: 'center'
  },
  flatItemContainer: {
    flexDirection: 'row',
    paddingVertical: GutterSizes.xxs
  },
  classContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  selectAllContainer: {
    backgroundColor: 'white', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: GutterSizes.xs
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  creditorText: {
    fontWeight: 'bold', 
    fontSize: 18
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GutterSizes.xs,
    paddingVertical: GutterSizes.sm,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center'
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingHorizontal: GutterSizes.sm,
    paddingTop: 16,
    alignSelf: 'center',
    width: '80%',
    height:'30%',
  },
  modalSuccessText: {
    fontSize: 28,
    color: Colors.Black,
    textAlign: 'center',
    fontWeight: "bold"
  },
  modalText: {
    fontSize: 16,
    color: Colors.Black,
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: Colors.LightGray,
    position: 'absolute',
    right: 0,
    bottom:0,
    paddingVertical: 12
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: 'center'
  },
})