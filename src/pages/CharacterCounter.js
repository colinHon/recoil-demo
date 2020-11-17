import React from 'react';
import {
    useRecoilState,
    atom
} from 'recoil';
import CharacterCount from './CharacterCount';
import bgSrc from '@assets/imgs/bg.jpg';
import style from './index.css';

const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

function CharacterCounter() {
    return (
      <div className={ style.main }>
        <TextInput />
        <CharacterCount />
      </div>
    );
}
  
function TextInput() {
    const [text, setText] = useRecoilState(textState);

    const onChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <input type="text" value={text} onChange={onChange} className={ style.input } />
            <br />
            Echo: {text}
        </div>
    );
}

console.log('recoil CharacterCounter');

export default CharacterCounter;