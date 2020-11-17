import React from 'react';
import {
  RecoilRoot
} from 'recoil';
import CharacterCounter from './CharacterCounter';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}


console.log('recoil App');

export default App;