import { onAuthStateChanged } from "firebase/auth"
import Base from "./Base"
import { auth } from "../config/Firebase";
import {useEffect, useState} from "react";

const Home = () => {

  /* useEffect(()=> {
    onAuthStateChanged(auth, (user)=> {
      if (user) {
        window.sessionStorage.setItem("accessToken", user.accessToken);
      } else {
        window.sessionStorage.removeItem("accessToken");
      }
    })
  },[]) */

    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from
        // flask server it will be redirected to proxy
        fetch('http://localhost:5000/data').then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            }).catch((err) => console.log(data, res, err))
        );
    }, []);

  return (
    <Base>
      <h1>
     Aplicação React Base
          {window.sessionStorage.getItem("accessToken")}
        <div>
            <h1>{data.name}</h1>
            <h1>{data.age}</h1>
            <h1>{data.date}</h1>
            <h1>{data.programming}</h1>
        </div>


      </h1>
    </Base>
  )
}

export default Home