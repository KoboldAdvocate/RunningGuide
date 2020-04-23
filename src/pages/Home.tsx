import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import {useFirebase} from '../hooks/useFirebase';
import { useWeather } from '../hooks/useWeather';
import { WeatherReport } from '../components/WeatherReport';

const Home: React.FC = () => {
  
  // handles login/logout
  const { userLogin, userLogout, loggedIn, username, userPhoto } = useFirebase();
  // openweathermap api calls
  const { getWeather, temp, weather } = useWeather();
  
  const [location, setLocation] = useState("Fredericksburg, usa");



  function displayLogin() {
    return (
      <div>
        <img src="/assets/images/signin.png" className="loginButton" onClick={() => userLogin() } alt="Login with Google" />
      </div>
    )
  }


  function displayUser() {
    return (
      <div className="standardLayout">
        
        <div className="userDisplay">
          <h1 className="name">Welcome, {username}</h1>
          <img className="image" src={userPhoto.toString()} alt="User" />  
          <WeatherReport currLocation={location} currTemp={temp} sun={weather}/>
        </div>

        <br /><br />
        <IonItem>
            <IonInput value={location} placeholder="Enter City" onIonChange={e => setLocation(e.detail.value!)}></IonInput>
        </IonItem>
        <div className="buttons">
          <IonButton onClick={ (() => getWeather()) } >Refresh</IonButton>
          <IonButton onClick={ () => userLogout() }>Logout</IonButton>
        </div>

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