import React from 'react'

const OpenMovie = (props) => {
console.log('props',props)
 var prop= []
  prop=props.trailer.results;
//   console.log('prop',prop[0].serie.image)

  return (
    <>
        <div>
        <div className='conainer my-4'>
    <div className="row">
          { 
      prop?.map((value,i)=>{
              return(
      
                          <div className="card" style={{"width": "18rem"}} key={i}>
                                 <img src={prop[i].serie.image} className="cvard-img-top" alt="..."/> 
                                 <div className="card-body">
                                  <h5 className="card-title">{prop[i].serie.title}</h5>
                                  <p className="card-text">Season{prop[i].season}-Episode({prop[i].episode})</p>       
                                </div>
                              </div> 
               )
      })
          }
          </div>
        </div>
      </div>

    </>
    
  ) 
}

export default OpenMovie;