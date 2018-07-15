import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import axios from 'axios';
import icons from 'glyphicons';
import ListEvent from '../ListEvent';
import SearchBar from '../SearchBar';

class Home extends Component {

  state = {
    data: [],
    loading: true,
   };

   loadQuotesFromServer = () => {
     axios.get('http://localhost:3001/api/events')
     .then(res => {
       this.setState({ data: res.data, loading: false });
     })
   }

   componentDidMount() {
     this.loadQuotesFromServer();
   }

  render() {

    const { data } = this.state;

    if (data.length > 0) {
      return (
      <div>
        
       {/*<SearchBar />*/}
        <div className={css(styles.searchContainer)}>
        <div className={css(styles.about)}>
        
        SOOONR est une application innovante permettant à des artistes de rue de se faire connaitre. L'idée est venu lorsqu'on a vu comment rues regorgent d'artistes qui selon nous meriterai d'être mis en avant. C'est pourquoi depuis cette application il est possible de créer des évenements, de suivre les évenements et voter pour les meilleures évenements.
        </div>
        <form className={css(styles.formSearchContainer)} >
          <input className={css(styles.inputSearchBar)} type="text"  id="search-bar" name="name" placeholder="Rechercher un évenement" ></input>
          <a className={css(styles.Link)} href="#">
              <img className={css(styles.searchIcon)} src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
          </a>
        </form>
        <select className={css(styles.linkBtn)} >
          <option value="valeur1">Tri par date</option> 
          <option value="valeur2" > Plus récents</option>
          <option value="valeur3">Plus anciens</option>
        </select>
        <select className={css(styles.linkBtn)} >
          <option value="valeur1">Tri par type</option> 
          <option value="valeur2">Sport</option>
          <option value="valeur3">Musique</option>
          <option value="valeur4">Art</option>
        </select>
      </div> 
      
      <div className={css(styles.eventMain)}>
      <div className={css(styles.eventCardList)}>
     
       {
              this.state.data.map((quote, key) =>  
              /*<ListEvent key={key} _id={quote._id}  name={quote.name} quote={quote.quote}/>*/
              <Link key={key}className={css(styles.link)} to={`/event/show/${quote._id}`}>
              <div className={css(styles.eventCard)}>
                  <div className={css(styles.colorOverlay)}>
                    <div className={css(styles.eventShare)}>
                    {/* <a class="event-share__icon" href="#">
                      <i class="material-icons">&#xe87d</i>
                    </a>
                    <a class="event-share__icon" href="#">
                      <i class="material-icons">&#xe253</i>
                    </a>
                    <a class="event-share__icon" href="#">
                      <i class="material-icons">&#xe80d</i>
                    </a> */}
                    </div>                   
                    <div className={css(styles.eventContent)}>         
                      <div className={css(styles.eventHeader)}>
                        <h3 className={css(styles.eventTitle)}>{icons.calendar} {quote.title}</h3>
                        <h4 className={css(styles.eventLieu)}>{icons.mapMarker}{quote.adress}</h4>
                        <h4 className={css(styles.eventLieu)}>Par {icons.mapMarker}{quote.creator}</h4>

                      </div>
                        <p className={css(styles.eventDetails)}>{quote.description}</p>
                        <Link className={css(styles.linkBtn)} to={`/event/show/${quote._id}`}>Show</Link>
                    </div>	
                    <div className={css(styles.eventImg)}>
                          <img className={css(styles.headerImg)} src={quote.imgUrl} />
                    </div>	                         
                </div>
              </div>
              </Link>
              )
             
            }
       </div>

      <div className={css(styles.eventSidebar)}>
         Nos meilleurs events
         <div className={css(styles.content)}>
  <div className={css(styles.text_box_main)}>
   <p className={css(styles.body_text_header)}>TOP EVENT</p>
   <div className={css(styles.body_code_main)}>
   <div className={css(styles.eventCardList)}>
     
                 
            <Link className={css(styles.link)} to={`/quote/1`}>
            <div className={css(styles.eventCard)}>
                <div className={css(styles.colorOverlay)}>                                  
                  <div className={css(styles.eventContent)}>         
                    <div className={css(styles.eventHeader)}>
                      <h1 className={css(styles.eventTitle)}>{icons.calendar} Test</h1>
                      <h4 className={css(styles.eventLieu)}>{icons.mapMarker}242 Faubourg Saint Antoine, Paris 75012</h4>
                    </div>
                      <p className={css(styles.eventDetails)}>details</p>
                      <Link className={css(styles.linkBtn)} to={`/quote/1`}>Show</Link>
                  </div>	
                  <div className={css(styles.eventImg)}>
                        <img className={css(styles.headerImg)} src="/img/sooonr.png" width="200"/>
                  </div>	                         
              </div>
            </div>
            </Link>
            
           
          
     </div> 

   </div>
   </div>
   </div>
     

           <div className={css(styles.eventCardList)}>
     
                 
            <Link className={css(styles.link)} to={`/quote/1`}>
            <div className={css(styles.eventCard)}>
                <div className={css(styles.colorOverlay)}>                                  
                  <div className={css(styles.eventContent)}>         
                    <div className={css(styles.eventHeader)}>
                      <h1 className={css(styles.eventTitle)}>{icons.calendar} Test</h1>
                      <h4 className={css(styles.eventLieu)}>{icons.mapMarker}242 Faubourg Saint Antoine, Paris 75012</h4>
                    </div>
                      <p className={css(styles.eventDetails)}>details</p>
                      <Link className={css(styles.linkBtn)} to={`/quote/1`}>Show</Link>
                  </div>	
                  <div className={css(styles.eventImg)}>
                        <img className={css(styles.headerImg)} src="/img/sooonr.png" width="200"/>
                  </div>	                         
              </div>
            </div>
            </Link>
            
           
          
     </div> 





       </div>
      </div>
      </div>
      );
    } else {
      return (
        <div className={css(styles.noQuote)}>
          There is no event yet :(<br/>
          <Link className={css(styles.link)} to='/new'>Click here</Link> to add your first event !
        </div>
      );
    }

  }
}

const styles = StyleSheet.create({
    table: {
      textAlign: 'center',
      maxWidth: 840,
      width: '100%',
      margin: '25px auto',
      border: '1px solid #000',
      borderCollapse: 'collapse',
    },
    row: {
      border: '1px solid #000',
      width: '50%',
    },
    cell: {
      border: '1px solid #000',
      padding: 10,
    },
    link: {
      color: '#000',
      textDecoration: 'none',
      opacity: '0.7',
      ':hover': {
        opacity: '1'
      }
    },
    noQuote: {
      marginTop: 20,
    },
    searchContainer: {
      width: '70%',
      display: 'block',
      margin: '0 auto',

    },
    inputSearchBar: {
      margin: '0 auto',
      width: '100%',
      height: '45px',
      padding: '0 20px',
      fontSize: '1rem',
      /*border: '1px solid #D0CFCE',*/
      outline: 'none',
      marginTop: '10px',
    },
    searchIcon: {
      position: 'relative',
      float: 'right',
      width: '75px',
      height: '75px',
      top: '-62px',
      
    },
    eventMain: {
      display: 'flex',
      width: '100%',
      margin: '0 auto',
      paddingRight: '15%',
      paddingLeft: '5%',
    },
    eventCard: {
      backgroundImage: '#0c0c0c',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '70%',
      maxWidth: '800px',      
      display: 'block',
      margin: '5vh auto',
      borderRadius: '8px',
      boxShadow:'0px 8px 12px 0px rgba(0,0,0,0.25)',
  },
  colorOverlay: {
    width:'100%',
    height: '100%',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px  1px silver',
    backgroundColor : '#673AB7',
    backgroundBlendMode: 'multiply',
    display: 'flex',
  },
  eventContent: {
    width: '40%',
    display: 'block',
    position: 'relative',
    paddingRight:'1em',
    borderRight: 'double',
    padding: '5%',
    color: '#434343',
    backgroundColor:"white",
    height: '100%',
  },
  eventCardList: {
    width: '100%', 
    display: 'block',
    
  },
  eventImg: {
    backgroundColor: '#000000',
    display: 'block',
    position: 'relative',   
    paddingRight:'1em',
    borderRight: 'double',
    color: '#434343',
    borderRadius: '8px',   
    width: '60%',
  },
  eventDetails: {
    margin: '15%',
  },
  linkBtn: {
  padding: '.8em 2em',
	backgroundColor: 'rgba(255,255,255,.2)',
	color: 'black',
  borderRadius: '8px',
  textDecoration: 'none',
	backgroundColor: 'transparent',
  border: '1px solid black',
  margin: '1%',
  ':hover':{
    borderColor: '#ffa70d',
	  color: '#ffa70d',
	  boxShadow: '0px 1px 8px 0px rgba(245,199,0,.2)',
}
  },
  eventSidebar: {
    backgroundColor: 'whitesmoke',
    padding: '3%',
  },
  eventTitle: {
    textTransform: 'uppercase',
    fontSize:"14px",
  },
  eventLieu: {
    fontSize: "11px",
  },
  headerImg: {
    width: '100%',
    height: '100%',
  },
  about: {
    margin: '3%',
  },content: {
    marginTop:'5%',
    top:'200px',
    textAlign:'center',
    opacity:1,
  },
  text_box_main: {
    width:'500px',
    margin:'auto',
    marginBottom:'50px',
    boxShadow:'0px 4px 20px rgba(0, 0, 0, 0.15)',
    padding:'10px',
  },
  body_text_header: {
    color:'#191919',
    
    fontWeight:700,
    opacity:0.6,
    borderStyle:'groove',
    borderTop:'none',
    borderLeft:'none',
    borderRight:'none',
    padding:'17px',
    width:'100px',
    margin:'auto',
    borderWidth:'1px',
  },
  
  body_code_main: {
    padding:'10px',
    margin:'10px',
    display:'inline-block',
  },
   
});

export default Home;
