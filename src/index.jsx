import './css/custom.css';
import './css/style.scss';
//import './index.html';

import React,{useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Chat = (props) => {
   const [messages, setMessages] = useState([]);
   const [inputValue, setInputValue] = useState('');
   useEffect(() => {
      setMessages(dataMessages);
   }, [])

   const now = new Date().toLocaleTimeString();
   const dataMessages = [
      {
         name: "User",
         text: "Привет, как дела?",
         datetime: now
      }
   ];
   const putMessage = () => {
      if (inputValue !== '' ) {
         const dataOutput = {
            name: "React",
            text: inputValue,
            datetime: now
         }
         messages.push(dataOutput)
         setMessages(messages);
         setInputValue('')
      } 
   }

   const changeValue = (e) => {
      setInputValue(e.target.value)
   }
   
   return (
      <div className="chat-wrap">
         <div className="chat-wrap_display">
            <div className="chat-wrap_display__messages">
               {
                  messages.map((item,index) => {
                     return <div key={index} className="chat-wrap_display__text">
                        <span>{item.name}</span>
                        <p>{item.text}</p>
                        <time>{item.datetime}</time>
                     </div>
                  })
               }
               <div className="chat-wrap_input">
                  <input type="text" size="60" value={inputValue} onChange={(e)=>{changeValue(e)}}/>
                  <button className="chat-wrap_input__button" onClick={putMessage}>Отправить</button>
               </div>
            </div>
            <div className="chat-wrap_display__contacts"></div>
         </div>
      </div>
   );
}

ReactDOM.render(
   <Chat />,
   document.getElementById('root'),
)
