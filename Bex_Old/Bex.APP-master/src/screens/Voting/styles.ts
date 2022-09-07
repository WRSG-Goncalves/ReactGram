import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import GlobalStyles from '../../styles/GlobalStyles';

export default StyleSheet.create({
  container: {
      flex: 1,
      padding: GutterSizes.xxs
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: GutterSizes.sm,
    alignSelf: 'center'
  },
  subtitle:{
    fontSize: 16,
    marginBottom: GutterSizes.sm,
    alignSelf: 'center'
  },
  voteButton: {
    marginVertical: GutterSizes.sm,
    paddingVertical: GutterSizes.sm,
    paddingHorizontal: GutterSizes.sm,
    width: '80%',
    backgroundColor: Colors.Green,
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
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.White,
  },
  resultTypes: {
    fontSize: 12,
    fontWeight: "bold",
  },
  creditorText: {
    fontWeight: 'bold', 
    fontSize: 18
  },
  flatItemContainer: {
    padding: GutterSizes.sm,
    paddingBottom: GutterSizes.sm,
    borderBottomWidth: 1,
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
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: Colors.LightGray,
    marginTop: GutterSizes.sm,
    paddingVertical: 5
  },
  selectedVoteText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "bold"
  },
  approve: {
    borderWidth: 1,
    borderColor: Colors.Green,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  approveSelected: {
    backgroundColor: Colors.Green,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  approveText: {
    color: Colors.Green,
    fontSize: 16,
    fontWeight: "bold"
  },
  disapprove: {
    borderWidth: 1,
    borderColor: Colors.Red,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  disapproveSelected: {
    backgroundColor: Colors.Red,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  disapproveText: {
    color: Colors.Red,
    fontSize: 16,
    fontWeight: "bold"
  },
  abstain: {
    borderWidth: 1,
    borderColor: Colors.Yellow,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  abstainSelected: {
    backgroundColor: Colors.Yellow,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: GutterSizes.xs,
    height: 50,
    width: 100,
  },
  abstainText: {
    color: Colors.Yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16,
    alignSelf: 'center',
    width: '80%',
    height:'33%',
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
    paddingVertical: 12,
    right: 0,
    bottom:0,
    
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: 'center'
  },
  textTitle: {
    fontSize: 13, 
    fontWeight: 'bold',
  },
  modalIncompleteContainer: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16,
    alignSelf: 'center',
    width: '80%',
    height:'28%',
  },
  modalIncompleteText: {
    fontSize: 20,
    color: Colors.Black,
    fontWeight: "bold",
  },
  modalIncompleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Black,
    textAlign: 'center'
  },
})