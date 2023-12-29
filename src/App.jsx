import "./global.css";
import s from "./style.module.css"
import { TVShowAPI } from "./api/tv-show";
import { useState, useEffect} from 'react'
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail.jsx";
import { Logo } from "./components/Logo/Logo.jsx";
import leNomQuonVeut from "./assets/images/logo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem.jsx";
import { TVShowList } from "./components/TVShowList/TVShowList.jsx";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";



export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommandations,setRecommandationList] = useState([])

    async function fetchPopulars(){
        try{
            const populars = await TVShowAPI.fetchPopulars();
            if(populars.length>0){
                setCurrentTVShow(populars[0])
            }
        }catch(error){
            alert("Erreur durant la recherche")
        }
      
    }

    async function fetchRecommandations(tvShowId){
        try{
            const recommandations = await TVShowAPI.fetchRecommandations(tvShowId)
            //récupère les 10 premiers éléments
            if(recommandations.length>0){
                setRecommandationList(recommandations.slice(0,10))
            }
        }catch{
            alert("Erreur durant la recherche")
        }  
        
    }

    async function searchTvShow(tvShowName){
        try{
            const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
            if(searchResponse.length>0){
                setCurrentTVShow(searchResponse[0])
            }
        }catch(erreur){
            alert("Erreur durant la recherche")
        }

        }
    
    useEffect(()=>{
        fetchPopulars();
    },[])

    useEffect(()=>{
        if(currentTVShow){
            fetchRecommandations(currentTVShow.id)
        }
    },[currentTVShow])

    // function setCurrentRecommandation(tvShow){
    //     alert(JSON.stringify(tvShow))
    // }




    return(
        <div className={s.main_container} style={{background: currentTVShow ?  `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`: "black" }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <div>
                            <Logo image={leNomQuonVeut} title="Watowatch" subtitle="Find a show you may like"/>
                        </div>
                        <div></div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <SearchBar onSubmit={searchTvShow}/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow &&<TVShowDetail tvShow={currentTVShow}/>}
            </div>
            <div className={s.recommandations} >
                {recommandations && recommandations.length>0 &&
                <TVShowList onClickItem={(tvShow)=>setCurrentTVShow(tvShow)} tvShowList={recommandations}/>}
            </div>
        </div>
   
    )
}