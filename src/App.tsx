import React, { useState } from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/index'
import Alert, { AlertType } from './components/Alert/index'
import Menu from './components/Menu/index';
import MenuItem from './components/Menu/MenuItem';

function App() {
  const [state, setState] = useState(false)
  return (
    <div className="App">
      <Button
        btnType={ButtonType.Default}
        size={ButtonSize.Small}
        onClick={() => { setState(!state) }}
      >
        Default
      </Button>
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Small}
      >
        Primary
      </Button>
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Large}
      >
        Large Primary
      </Button>
      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Small}
      >
        Danger
      </Button>
      <Button
        btnType={ButtonType.Default}
        size={ButtonSize.Small}
        disabled
      >
        disabled
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href='http://www.baidu.com/'
      >
        baidu Link
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href='http://www.baidu.com/'
        disabled
      >
        disabled Link
      </Button>
      <Alert alertType={AlertType.Default} title='Default' description='hhh' onClose={() => { setState(!state) }} visible={state}></Alert>
      <Alert alertType={AlertType.Success} title='Success' visible></Alert>
      <Alert alertType={AlertType.Danger} title='Danger' visible></Alert>
      <Alert alertType={AlertType.Warning} title='Warning' closable={false} visible></Alert>
      <Menu defaultIndex={0} onSelect={(i) => alert(i)} mode='vertical'>
        <MenuItem>cool link1</MenuItem>
        <MenuItem>cool link2</MenuItem>
        <MenuItem>cool link3</MenuItem>
        <MenuItem disabled>cool link4</MenuItem>
        <li>1111</li>
      </Menu>
      <Menu defaultIndex={0} onSelect={(i) => alert(i)}>
        <MenuItem index={0}>cool link1</MenuItem>
        <MenuItem index={1}>cool link2</MenuItem>
        <MenuItem index={2}>cool link3</MenuItem>
        <MenuItem index={3} disabled>cool link4</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
