import React,{useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Genre from './components/Genre';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {db} from './firebase'
import {auth} from './firebase'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// const datam=[
//   user1={name:'nitin'},
//    user2={name:'nit'},
//   user3={name:'niti'},
//  ]

function App() {
  
  const [film, setFilm] = useState([]);
  const [filterr, setFilter] = useState([]);
  const [text, setText] = useState('Text');
  const [fav, setFav] = useState(false);
  const [favmovie, setMovie] = useState([]);

 useEffect(()=> {
    filterFilm(); 
}, [text]);


  const changeText = (event)=>{
    setText(event.target.value);
  }
    // const showMovie = (e) =>{
      

    //   var options = {
    //     method: 'GET',
    //     url: `https://movies-app1.p.rapidapi.com/api/movies`,
    //     headers: {
    //       'x-rapidapi-host': 'movies-app1.p.rapidapi.com',
    //       'x-rapidapi-key': '0a4a15f8b1msh67ff19cb5779a22p18611bjsn5726ff736a76'
    //     }
      
    //   };
      
    //   axios.request(options).then(function (response) {
    //     // console.log(response.data);
    //     setFilter(response.data.results);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });
    // }
    const showMovie=async()=>{
      let result = await fetch('https://www.superheroapi.com/api.php/2101410510009367/search/superman')
      try{
        let data = await result.json();
        console.log(data);
      }
      catch(error){
        console.log(error);
      }
    }

    const showfav=()=>{
        setFav(!fav);
        firebase
        .firestore()
        .collection('favsong')
        .get()
        .then((snapshot)=>{
            console.log(snapshot);

            snapshot.docs.map((doc)=>{
            console.log(doc.data())
          setMovie(favmovie=>[...favmovie, doc.data()])
        });
        // showfavmovie();
      })
    }

// const showfavmovie = ()=>{

// }
  const saveFavourite = (film)=>{
    
    
        firebase
        .firestore()
        .collection('favsong')
        .add({
          img:film.thumbnail,
          title:film.title
         }).then((docRef)=>{
          console.log('saved song',docRef);
          alert('added to fav list')
         }).catch((err)=>{
           console.log(err);
         })
      }
            
  const removeFavourite = (title)=>{
    firebase.
    firestore()
    .collection('favsong')
    .doc(title)
    .delete()
    .then(()=>{
      console.log('Deleted',title)
      alert('removed')
    })
    .catch((err)=>{
        console.log('error',err)
    })
  }
  const filterFilm = ()=>{
    var options = {
      method: 'GET',
      url: 'https://universal-studios1.p.rapidapi.com/search.php',
      params: {keyword:`${text}`},
      headers: {
        'x-rapidapi-host': 'universal-studios1.p.rapidapi.com',
        'x-rapidapi-key': '0a4a15f8b1msh67ff19cb5779a22p18611bjsn5726ff736a76'
      }
    };
    
    axios.request(options).then(function (response) {
       console.log(response.data);
      setFilm(response.data.data);
      console.log('film',response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }

 

  return (
    <div className="App">


      <button onClick={showMovie}>Show Movies</button> 
  
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Movies App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
     
     
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <input placeholder='Filter movie'/>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#"></a></li>
            <li onClick={showfav}><a className="dropdown-item" href="#">Favourites</a>
                
            
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Type</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Genre</a></li>
          </ul>
        </li>
     
      </ul>
      <form className="d-flex">
        <input  onChange={changeText}  className="form-control me-2" type="search" placeholder="Search By Title" aria-label="Search"/>
        <button>Click</button>
      
      </form>
    </div>
  </div>
</nav>

<div className='conainer my-3'>
    <div className="row">
    {(!fav)?
    <>
                {
                film?.map((value,i)=>{
                    return(
                                                  
                              <div className="card" style={{"width": "18rem"}}>
                              <img src={value.thumbnail} className="cvard-img-top" alt="..."/>
                              <div className="card-body">
                                <h5 className="card-title">{film[i].title}</h5>
                                {/* <h5 className="card-title"> {film[i].id}</h5> */}
                                
                                <a href="#" className="btn btn-primary" onClick={(e)=>saveFavourite(film[i])}>Save</a>
                              </div>
                            </div>
                            
                    )}

                )

                }
                </>
    :
    
    favmovie?.map((value,i)=>{
      console.log(favmovie[i])
      return(
        <div className="card" style={{"width": "18rem"}} key={i} id={i}>
                              <img src={favmovie[i].img} className="cvard-img-top" alt="..."/>
                              <div className="card-body">
                                <h5 className="card-title">{favmovie[i].title}</h5>
                                
                               <a href="#" className="btn btn-primary" onClick={(e)=>removeFavourite(favmovie[i].title)}>Unfavourite</a> 
                              </div>
                            </div>
      )
    })
    }      
              <div>
                <Genre data={filterr}/>
                </div>
              </div>

       </div>
    
    </div>
  );
}

export default App;
 