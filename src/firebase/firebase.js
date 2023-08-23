// firebase/appからinitializeApp関数をインポート
import { initializeApp } from "firebase/app";
// firebase/authからgetAuth関数をインポート
import { getAuth } from "firebase/auth";
// firebase/firestoreからgetFirestore関数をインポート
import { getFirestore } from "firebase/firestore";

// Firebaseの設定情報を取得
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_IREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_API_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: "G-P4YP48GWZ1",
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// 初期化されたアプリを使用して認証オブジェクトを取得
const auth = getAuth(app);

// 初期化されたアプリを使用してデータベースオブジェクトを取得
const db = getFirestore(app, { experimentalForceLongPolling: true });

// Firestoreの設定を更新（ロングポーリングを有効にする）
// 認証オブジェクトとデータベースオブジェクトをエクスポート
export { auth, db };
