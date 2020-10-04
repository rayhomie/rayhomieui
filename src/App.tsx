import React from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/index'
import Alert, { AlertType } from './components/Alert/index'

function App() {
  return (
    <div className="App">
      <Button
        btnType={ButtonType.Default}
        size={ButtonSize.Small}
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
      <Alert alertType={AlertType.Default} title='Default' description='hhh'></Alert>
      <Alert alertType={AlertType.Success} title='Success'></Alert>
      <Alert alertType={AlertType.Danger} title='Danger'></Alert>
      <Alert alertType={AlertType.Warning} title='Warning' closable={false}></Alert>
    </div>
  );
}

export default App;
