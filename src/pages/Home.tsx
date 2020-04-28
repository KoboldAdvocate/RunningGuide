import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonInput, IonMenu, IonList, IonMenuButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import {useFirebase} from '../hooks/useFirebase';
import { WeatherReport } from '../components/WeatherReport';
import { useInfo } from '../hooks/useInfo';

const Home: React.FC = () => {
  
  // handles login/logout
  const { userLogin, userLogout, loggedIn, username, userPhoto } = useFirebase();
  // openweathermap api calls
  const { getLocation } = useInfo();
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
        {displayMenu()}
        <div className="userDisplay">
          <h1 className="name">Welcome, {username}</h1>
          <img className="image" src={userPhoto.toString()} alt="User" />  
          <WeatherReport currLocation={location} />
        </div>
        <br /><br />
        <IonItem>
            <IonInput value={location} placeholder="Enter City" onIonChange={e => setLocation(e.detail.value!)}></IonInput>
        </IonItem>
        <div className="buttons">
          <IonButton onClick={ (() => getLocation()) } >Refresh</IonButton>
          <IonButton onClick={ () => userLogout() }>Logout</IonButton>
        </div>

      </div>
    )
  }

  function displayMenu() {
    return (
      <IonMenu side="start" menuId="first" content-id="content"> 

        <IonContent id="content">
          <IonList>
            <IonItem>Morning</IonItem>
            <IonItem>Afternoon</IonItem>
            <IonItem>Evening</IonItem>
          </IonList>
        </IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Weather</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonMenu>
    )
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
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