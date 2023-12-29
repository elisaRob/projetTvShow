import "./global.css";
import s from "./style.module.css"
import { TVShowAPI } from "./api/tv-show";
import { useState, useEffect} from 'react'
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail.jsx";
import { Logo } from "./components/Logo/Logo.jsx";


export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();

    async function fetchPopulars(){
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length>0){
            setCurrentTVShow(populars[0])
        }
    }

    useEffect(()=>{
        fetchPopulars();
    },[])

    console.log(currentTVShow)

    return(
        <div className={s.main_container} style={{background: currentTVShow ?  `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`: "black" }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <div>
                            <Logo title="Watowatch" subtitle="Find a show you may like"/>
                        </div>
                        <div>Subtitle</div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow &&<TVShowDetail tvShow={currentTVShow}/>}
            </div>
            <div className={s.recommendations}>Recommandations</div>
        </div>
   
    )
}