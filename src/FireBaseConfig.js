import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCN1Rryi0UcudoVz3zenZ7N_eqMYi9EluI",
    authDomain: "reactnotesapp-69e14.firebaseapp.com",
    databaseURL: "https://reactnotesapp-69e14-default-rtdb.firebaseio.com",
    projectId: "reactnotesapp-69e14",
    storageBucket: "reactnotesapp-69e14.appspot.com",
    messagingSenderId: "845002682858",
    appId: "1:845002682858:web:8172226671be3c6214c293",
    measurementId: "G-ZXC0H916CN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;