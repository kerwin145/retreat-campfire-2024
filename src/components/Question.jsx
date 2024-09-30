import React, { useEffect, useState } from 'react'
import './question.css'

const Question = ({qId, text_english, text_chinese, qSelected, setSelected}) => {
    const maxCount = 2
    const [usesLeft, setUsesLeft] = useState(maxCount)


    const handleClick = (event) => {
        if (qSelected == null && usesLeft > 0){
            setUsesLeft(prevUsesLeft => Math.max(prevUsesLeft - 1, 0))
            setSelected({ english: text_english, chinese: text_chinese});
        }else if (qSelected?.english == text_english){
            setUsesLeft(prevUsesLeft => Math.min(prevUsesLeft + 1, maxCount))
            setSelected(null)
        }
    };

    const renderUsesPanel = () => {
        return Array.from({ length: usesLeft }).map((_, index) => (
            <div key={index} className="question-use-indicator"></div>
        ));
    };

    return (
        <div 
        className={`
            question 
            ${qSelected && "question-reduced"} 
            ${usesLeft === 0 && "question-disabled"} 
            ${qSelected?.english === text_english && "question-selected"}
          `}          
            onClick={handleClick}
        >
            {/* <div className="question-uses" onClick={()=>{ if(qSelected == null) setUsesLeft(prevUsesLeft => Math.max(prevUsesLeft + 1, 0))}}> */}
            <div className="question-uses">
                {renderUsesPanel()}
            </div>
            <p className='qtext-chinese'>{text_chinese}</p>
            <p className='qtext-english'>{text_english}</p>
            {/* {qSelected != null || !textVisible ? 
            <>{qId}</>
            :
            <> 
                <p>{text_english}</p>
                <p>{text_chinese}</p>
            </>
            } */}
           
        </div>
    )
}

export default Question