import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonMenu, IonList, IonItem } from '@ionic/react';
import React, { useEffect } from 'react';
import './Home.css';
import {useFirebase} from '../hooks/useFirebase';
import { useInfo } from '../hooks/useInfo';
import { useWeather } from '../hooks/useWeather';

const Home: React.FC = () => {
  
  // handles login/logout
  const { userLogin, userLogout, loggedIn, username, userPhoto } = useFirebase();
  // user settings
  const { zipcode, changeTemp } = useInfo();
  // openweathermap api calls
  const { getWeather, temp, weather } = useWeather();
  
  useEffect(() => {
    getWeather();
  })

  function displayLogin() {
    return (
      <div>
        <img src="/assets/images/signin.png" className="loginButton" onClick={() => userLogin() } alt="Login with Google" />
      </div>
    )
  }

  function displayUser() {
    return (
      <div>
        <h1 className="name">Welcome, {username}</h1>
        <img className="image" src={userPhoto.toString()} alt="User" />  
        <p>Weather in {zipcode}</p>
        <p>{temp}°F and {weather}</p>

        <IonButton onClick={ (() => getWeather()) } >Update</IonButton>

        <IonMenu side="start" swipeGesture={true} contentId="timeMenu">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Relative Temp</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent id="timeMenu">
            <IonList>
              <IonButton onClick={() => changeTemp("Cold") }>Cold</IonButton>
              <IonButton onClick={() => changeTemp("Warm") }>Warm</IonButton>
              <IonButton onClick={() => changeTemp("Hot") }>Hot</IonButton>
            </IonList>
          </IonContent>

          <IonHeader>
            <IonTitle>Weather</IonTitle>
          </IonHeader>
          <IonContent id="weatherMenu">
            <IonList>
              <IonItem>Sunny</IonItem>
              <IonItem>Cloudy</IonItem>
              <IonItem>Rainy</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonButton onClick={ () => userLogout() }>Logout</IonButton>
      </div>
    )
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Running Guide</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {loggedIn ? displayUser() : displayLogin() }
      </IonContent>

    </IonPage>
  );
};

export default Home;
