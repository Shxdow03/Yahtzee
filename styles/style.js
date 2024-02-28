import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '../metrics/Metrics';

export default style = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#eccece',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeView: {
    flex: 10,
    alignItems: 'center'
  },
  homeScreenView: {
    flex: 1,
    backgroundColor: '#eccece',
    alignItems: 'center'
  },
  view: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  scoreview: {
    flex: moderateScale(10),
    alignItems: 'center',
  },
  rulesView: {
    marginTop: verticalScale(10), 
    marginBottom: verticalScale(-15),
    marginHorizontal: horizontalScale(10), 
    paddingBottom: verticalScale(20),
    alignItems: 'center',
    flex: 5
  },
  textinput: {
    backgroundColor: '#fff',
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    fontSize: moderateScale(24),
    width: horizontalScale(300),
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(15),
    alignSelf: 'stretch',
    alignContent: 'center',
    borderColor: 'maroon',
    color: 'maroon'
  },
  title: {
    color: '#eccece',
    fontWeight: '800',
    flex: 1,
    fontSize: moderateScale(30),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  author: {
    color: '#eccece',
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
  },
  scoreboardIcon: {
    marginTop: verticalScale(10)
  },
  homeIcon: {
    marginTop: verticalScale(10)
  },
  playButton: {
    alignItems: 'center'
  },
  scoreboardText: {
    fontSize: moderateScale(30),
    color: 'maroon',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  scoreboardEntryText: {
    color: 'maroon',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    fontSize: moderateScale(15),
    borderColor: 'maroon',
    borderRadius: moderateScale(3),
    fontWeight: 'bold',
    borderWidth: moderateScale(2),
    marginBottom: verticalScale(5)
  },
  rules: {
    fontWeight: 'bold',
    fontSize: moderateScale(30),
    color: 'maroon',
  },
  rulesText: {
    fontSize: moderateScale(14),
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    textAlign: 'center',
  },
  gameboardView: {
    flex: 1,
    backgroundColor: '#eccece',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberView: {
    flexDirection: 'column', 
    alignItems: 'center'
  },
  textView: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  header: {
    backgroundColor: 'maroon',
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row'
  },
  footer: {
    backgroundColor: 'maroon',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  status: {
    backgroundColor: '#eccece',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    color: 'maroon',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(2),
    borderColor: 'black',
    fontSize: moderateScale(18),
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    fontWeight: '700'
  },
  numberText: {
    fontSize: moderateScale(20)
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    flexDirection: "row",
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: "maroon",
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(18), 
    fontWeight: 'bold',
    
  },
  placeHolderIcon: {
    fontSize: moderateScale(50),
    color: 'maroon',
    marginTop: verticalScale(10),
  },
  total: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: 'maroon',
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderBottomColor: 'maroon',
  },
  gameboardText: {
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  playerText: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: 'maroon',
    marginBottom: verticalScale(10)
  },
  homeStatus: {
    color: 'maroon',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(20),
    marginTop: verticalScale(10),
    fontWeight: '700'
  },
  datatableText: {
    textAlign: 'center'
  },
  scrollview: {
    alignItems: 'center', 
    backgroundColor:'#f6d0d0', 
    width: Dimensions.get('window').width-moderateScale(20), 
    justifyContent: 'space-evenly'
  },
  datatableHeader: {
    borderColor: 'maroon', 
    borderWidth: moderateScale(2), 
    borderBottomColor: 'maroon', 
    borderBottomWidth: moderateScale(2), 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  datatableOutline: {
    borderRightWidth: 2, 
    borderColor: 'maroon'
  },
  datatableTitle: {
    justifyContent:'center'
  },
  datatableTitleText: {
    color: 'maroon', 
    fontWeight: 'bold'
  },
  datatableCell: {
    justifyContent: 'center'
  },
  datatableCellBorder: {
    borderRightWidth: moderateScale(2), 
    borderColor: 'maroon'
  },
  datatableRow: {
    borderColor:'maroon', 
    borderBottomWidth: moderateScale(2), 
    borderRightWidth: moderateScale(2), 
    borderLeftWidth: moderateScale(2)
  },
  score: {
    fontWeight: 'bold'
  },
  tabBarBadge: {
    backgroundColor: '#eccece', 
    borderColor: 'maroon', 
    borderWidth: moderateScale(1), 
    color: 'maroon', 
    fontSize: moderateScale(10)
  },
  outline: {
    backgroundColor: '#b59090'
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontFamily: 'LatoRegular'
  },
  tabBarLabel: {
    fontSize: moderateScale(10),
    fontFamily: 'LatoRegular'
  }
});