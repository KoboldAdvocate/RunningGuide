import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React from 'react';
import './Home.css';
import {useFirebase} from '../hooks/useFirebase';
import { useInfo } from '../hooks/useInfo';

const Home: React.FC = () => {
  
  const { userLogin, loggedIn, username, userPhoto } = useFirebase();
  
  function displayLogin() {
    return (
      <div>
        <IonButton onClick={() => userLogin() }>Login</IonButton>
      </div>
    )
  }

  function displayUser() {
    return (
      <div>
        <h1>Welcome, {username}</h1>
        
        <img src={userPhoto.toString()} />
        <IonButton >click</IonButton>
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
