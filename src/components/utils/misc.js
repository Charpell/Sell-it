import { Dimensions,
  Platform, AsyncStorage } from 'react-native';

export const getOrientation = (value) => {
  return Dimensions.get("window").height > value ?  "portrait" : "landscape" 
}

export const setOrientationListener = (cb) => {
  return Dimensions.addEventListener("change", cb)
}

export const removeOrientationListener = () => {
  return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
  if( Platform.OS === 'ios') {
      return "ios"
  } else {
      return "android"
  }
}

export const navigatorDrawer = (event, $this) => {
  if(event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
      $this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true
      })  
  }
}


export const navigatorDeepLink = (event, $this) =>{
  if(event.type === 'DeepLink'){
      $this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true
      });

      if(event.payload.typeLink === 'tab'){
          $this.props.navigator.switchToTab({
              tabIndex: event.payload.indexLink
          });
      } else {
          $this.props.navigator.showModal({
              screen: event.link,
              animationType:'slide-horizontal',
              navigatorStyle:{
                  navBarBackgroundColor: '#00ADA9',
                  screenBackgroundColor: '#ffffff'
              },
              backButtonHidden: false
          })
      }
  }
}



export const getTokens = (callbackFunction) => {
  AsyncStorage.multiGet([
      '@sellitApp@token',
      '@sellitApp@refreshToken',
      '@sellitApp@expireToken',
      '@sellitApp@uid',
  ]).then(value=>{
      callbackFunction(value)
  })
}


export const setTokens = (values, callbackFunction) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + (3600 * 1000);

  AsyncStorage.multiSet([
      ['@sellitApp@token', values.token],
      ['@sellitApp@refreshToken', values.refToken],
      ['@sellitApp@expireToken', expiration.toString()],
      ['@sellitApp@uid', values.uid],
  ]).then( response => {
      callbackFunction();
  })
}