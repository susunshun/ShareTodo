// TODO: store.jsに寄せちゃっていいかも
import firebase from 'firebase/app'
import 'firebase/firestore'

let db;
try {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  firebase.initializeApp(config);
} catch (error) {
  // 開発時のホットリロード等でfirebaseのインスタンスが保持されたまま、
  // firebase.initializeAppが実行されると発生する
  console.error('Firebase initialization error');
}
// Firestoreインスタンスを作成
db = firebase.firestore();

module.exports = {
  // 本来、initializeAppによる初期化は一度きりのため、
  // 初期化の結果のみを切り出してexportする
  db
};