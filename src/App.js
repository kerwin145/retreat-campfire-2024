import './App.css';
import Question from './components/Question';
import React, { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [qSelected, setSelected] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.txt');
        const data = await response.text();
        const lines = data.split('\n').map(line => line.trim()).filter(line => line);  //.filter removes lines with online white space 
        const questionArray = [];

        for (let i = 0; i < lines.length; i += 2) {
          const english = lines[i+1];
          const chinese = lines[i];
          questionArray.push({ english, chinese });
        }

        setQuestions(questionArray);
      } catch (error) {
        console.error('Error fetching the questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(()=> {
    const banner = document.getElementById('banner')
    if (qSelected != null){
      banner.classList.add('banner-expanded')

      const timeoutId = setTimeout(() => {
        banner.innerHTML = `<p>${qSelected.chinese}</p><p>${qSelected.english}</p>`
      }, 900);
      return () => clearTimeout(timeoutId);
    }
    else{
      banner.classList.remove('banner-expanded')
      banner.innerHTML = `Please pick a question / 请选题`

    }
  }, [qSelected])

  return (
    <div className = "App">
        <h3 id = "banner" onClick={()=>{setSelected(null)}}><p>Please pick a question / 请选题</p></h3>
  
        <div id = "questions-container" className={`${qSelected != null && "questions-container-reduced"}`}>
          {questions.map((question, index) => (
            <Question
              key= {index + 1} 
              text_english={question.english}  
              text_chinese={question.chinese} 
              qSelected = {qSelected} 
              setSelected = {setSelected}
              qId = {index + 1}
            />
          ))}    
        </div>
      </div>
  );
}

export default App;
