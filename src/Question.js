import React from 'react';
import './Question.css';
import { useStateValue } from './Auth';
import Questionnaire from './component/Questionnaire'

import { db } from './firebase';

function Question() {
  const [{ question }, dispatch] = useStateValue();
  return (<div>
    New Question
    {question?.map(({ content, value }) => {
      return (<div><Questionnaire content={content} /></div>)
    })}
  </div>)
}

export default Question;