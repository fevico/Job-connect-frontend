import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAfTjvod3-sHdYv01LZQyp-y8pYahheckE",
//   authDomain: "jobkonect-b5f67.firebaseapp.com",
//   projectId: "jobkonect-b5f67",
//   storageBucket: "jobkonect-b5f67.appspot.com",
//   messagingSenderId: "1081805787548",
//   appId: "1:1081805787548:web:0eec77685c69e7aefab859",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB7KfkCmtIUtJg3V4b9MfNOWayVbfpCxkM",
  authDomain: "jobkonecta.firebaseapp.com",
  projectId: "jobkonecta",
  storageBucket: "jobkonecta.appspot.com",
  messagingSenderId: "801346387124",
  appId: "1:801346387124:web:e52b7a46062bc24a46ebe1",
  measurementId: "G-BRNRRZMPTR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
