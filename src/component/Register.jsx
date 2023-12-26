import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

import Logo from "../image/add_user_profile_person_avatar_icon_196535.png";

export default function Register({ onLogin, onHome }) {
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            onHome();
          });
        }
      );
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">chatHive</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{fill: "rgba(255, 255, 255, 1)"}}
            >
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
            </svg>
            <span>add avatar</span>
          </label>
          <button>Sign up</button>
          {error && <p>Failed to Signup</p>}
        </form>
        <p onClick={onLogin}>Already have account? Login</p>
      </div>
    </div>
  );
}
