import React,{useState,useEffect} from 'react'
import OpenMovie from './OpenMovie';
import axios from 'axios';
 
 //import {auth} from 'firebase'

const Genre = (props) => {
    
    const [trailer,setTrailer] = useState([]);
    // const[epi,setEpisodes]=useState('false');

        var result=[]
        result=props.data;
        // console.log(result);
        useEffect(()=> {
           
        
      
      }, [trailer]);
      
     
    
  const sendMovie=()=>{
  
    var options = {
      method: 'GET',
      url: 'https://movies-app1.p.rapidapi.com/api/episodes',
      headers: {
        'x-rapidapi-host': 'movies-app1.p.rapidapi.com',
        'x-rapidapi-key': '0a4a15f8b1msh67ff19cb5779a22p18611bjsn5726ff736a76'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.results);
      setTrailer(response.data);
      

    }).catch(function (error) {
      console.error(error);
    });
  }

  return (

   <>
  
    <h2>Favourites</h2>
    <div className='conainer my-3'>
    <div className="row">

    <button onClick={sendMovie}>Watch Series</button>
        <OpenMovie trailer={trailer}/>


{
 
    result.map((value,i)=>{
            return(

                        <div className="card" style={{"width": "18rem"}} key={i}>
                               <img src={result[i].image} className="cvard-img-top" alt="..."/> 
                               <div className="card-body">
                                <h5 className="card-title">{result[i].title}</h5>
                                <p className="card-text"></p>
                                <a href="#" className="btn btn-primary" value={result[i]._id} onClick={(e)=>sendMovie(value)}>
                                      
                                    </a>

                                
                              </div>
                            </div> 
             )
    })
    
}
   </div>
   
    </div>
   
   
   
  </>
)


}
export default Genre;