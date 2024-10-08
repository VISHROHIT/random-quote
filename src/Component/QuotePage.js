import React, { useEffect, useState } from 'react';
import styles from './Quote.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';




export default function QuotePage (){
    
    const [quotes,setQuotes] = useState([]);
    const [currentQuote, setCurrent] = useState(null);
    const [bgColor, setbgColor] = useState('');

    const RandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      

    

    
    const fetchQuote = async() => {
            try {
                
                const response = await fetch('https://dummyjson.com/quotes')
                const result = await response.json();
                setQuotes(result.quotes)
                const index = Math.floor(Math.random()*result.quotes.length)
                setCurrent(result.quotes[index])
            
            } catch (error) {
                console.error(error)
            }
        }
        
    useEffect(()=>{
        fetchQuote();
        setbgColor(RandomColor());
    }, []);

    const handleClick = () => {
        setbgColor(RandomColor());
        if (quotes.length === 0) return; // Avoid error if quotes are not loaded
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrent(quotes[randomIndex]); // Set a random quote from the stored quotes
      };
    

    if (!currentQuote) {
        return null; // You can customize this to show a spinner, etc.
      }
    /*const handleClick = () => {
        
    }*/

    
    
    /*const button = document.getElementById('new-quote');
    const text = document.getElementById('text'); 
    const author =  document.getElementById('author');
    const index = Math.floor(Math.random()*31);
    
    button.addEventListener('click',()=>{
        console.log(quote.quotes[index])
    })*/
    return(
        <div style={{backgroundColor: bgColor}} className={styles.div} id='container'>
            <div  style={{color: bgColor}} className={styles.div2} id='quote-box'>
            
                <p className={styles.quote} id='text'>{currentQuote.quote}</p>
                <span  className={styles.author} id='author'>{currentQuote.author}</span>
                <div className={styles.ba}>
                    
                    <a className="button" id="tweet-quote" title="Tweet this quote!" target="_top" href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22Few%20things%20can%20help%20an%20individual%20more%20than%20to%20place%20responsibility%20on%20him%2C%20and%20to%20let%20him%20know%20that%20you%20trust%20him.%22%20Booker%20T.%20Washington">
                        <FontAwesomeIcon icon={faTwitter} mask={faSquare} size='xl'/>
                    </a>
                    <button style={{backgroundColor: bgColor, color:'white'}} className={styles.button} onClick={handleClick} id='new-quote'>New Quote</button>
                </div>
            </div>
            <script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'></script>
        </div>
    )
}