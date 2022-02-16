const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');


let apiQuotes=[];

//Show New Quote
function newQuote(){
    //Pick a random quote from apiQuotes array
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if the author exists
    authorText.textContent=quote.author??"Unknown";
    //Check the quote length for determine styling
    quote.text.length>120?quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');
    quoteText.textContent=quote.text;
}

//Get Quote from API
async function getQuote(){
    const apiUrl='https://type.fit/api/quotes';
    try{
        await fetch(apiUrl)
        .then(response=>response.json())
        .then(response=>{
            apiQuotes=response;
        })
        newQuote();
    }catch(ex){
        console.log("Something went wrong: " +ex);
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);

//On Load
getQuote();