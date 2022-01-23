import React,{ useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';   
import useStyles from './styles.js';


const alanKey='656ebdd571756c8ecd98c92ed8939eec2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () =>{


    const [newsArticles,setNewsArticles]=useState([]);
    const [activeArticle,setActiveArticle]=useState(-1);
    const classes=useStyles();
    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command==='highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if(command==='open'){
                    const parsedNumber=number.length>2 ? wordsToNumbers(number, {fuzzy : true}): number;
                    const article=articles[parsedNumber-1];
                    if(parsedNumber>20){
                        alanBtn().playText('Please try that again.')
                    }
                    else if(article){
                        window.open(article.url,'_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        })
    },[])
    
    return(
        <div>
        <div className={classes.logoContainer}>
            <img src="https://miro.medium.com/max/600/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg" className={classes.alanLogo} alt="alan logo"/>
        </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;