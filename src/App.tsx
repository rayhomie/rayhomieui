import React, { useState } from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/Button'
import Alert, { AlertType } from './components/Alert/Alert'
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu'
import Tabs from './components/Tabs/Tabs'
import TabItem from './components/Tabs/TabItem'
import Icon from './components/Icon/Icon';
import Pagination from './components/Pagination/Pagination'
import Page from './test/PaginationTest';
import Input from './components/Input/Input';
import AutoComplete from './components/AutoComplete/AutoComplete'
import useDraggable from './hooks/useDraggable'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Upload from './components/Upload/Upload';



library.add(fas)
const lakers = ['cook', 'AD', 'james', 'green', 'howard', 'kuzma', 'McGee', 'rando', 'bradley', 'pope', 'caruso']
function App() {
  const [state, setState] = useState(false)
  // const { Ref, MouseDown, MouseMove, MouseUp } = useDraggable()
  return (
    <div className="App">
      <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        onProgress={(e, f) => { console.log(e, f) }}
        // onSuccess={(e, f) => { console.log(e, f) }}
        // onError={(e, f) => { console.log(e, f) }}
      />
      {/* {<img
        src={process.env.PUBLIC_URL + '/logo512.png'}
        onMouseDown={MouseDown}
        onMouseMove={MouseMove}
        onMouseUp={MouseUp}
        ref={Ref}
        style={{ position: 'absolute', zIndex: 99 }}
      />}
      <DraggableTest /> */}
      <Input size='sm' style={{ width: '300px' }} icon="coffee" prepend='www.' append='.com' onChange={(e) => { console.log(e.target.value); }} />
      <AutoComplete fetchSuggestions={(query) => lakers.filter(name => name.includes(query.toLowerCase()))} value='1' />
      <div>
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
        <Alert alertType={AlertType.Warning} title='Warning' closeable={false} visible></Alert>
        <Menu defaultIndex={'0'} onSelect={(i) => alert(i)} mode='vertical'>
          <MenuItem>cool link1</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title='cool link3'>
            <MenuItem>cool link3.1</MenuItem>
          </SubMenu>
          <MenuItem disabled>cool link4</MenuItem>
          <li>1111</li>
        </Menu>
        <Menu defaultIndex={'0'} onSelect={(i) => alert(i)}>
          <MenuItem>cool link1</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title='cool link3'>
            <MenuItem>cool link3.1</MenuItem>
          </SubMenu>
          <MenuItem disabled>cool link4</MenuItem>
        </Menu>
        <Tabs onSelect={(i) => { alert(i) }}>
          <TabItem labal='card1'>this is card1</TabItem>
          <TabItem labal='card2'>this is card2</TabItem>
          <TabItem labal='card3' disabled>this is card3</TabItem>
          <TabItem labal='card4'>
            <h2>this is card4 title</h2><main>this is card4</main>
          </TabItem>
        </Tabs>
        <Tabs onSelect={(i) => { alert(i) }} type='card'>
          <TabItem labal='card1'>this is card1</TabItem>
          <TabItem labal='card2'>this is card2</TabItem>
          <TabItem labal='card3' disabled>this is card3</TabItem>
          <TabItem labal='card4'>
            <h2>this is card4 title</h2><main>this is card4</main>
          </TabItem>
          <li>111</li>
        </Tabs>
        <Icon icon='arrow-down' size='6x' rotation={180} theme='success' />
        <Icon icon='arrow-down' size='6x' rotation={180} theme='warning' />
        <Icon icon='arrow-down' size='6x' rotation={180} theme='primary' />
        <Icon icon='arrow-down' size='6x' rotation={180} theme='secondary' />
        <Icon icon='arrow-down' size='6x' rotation={180} theme='info' />
        <Icon icon='arrow-down' size='6x' rotation={180} theme='danger' />
      </div>

      <Pagination total={500} pageSize={10} disabled className='hhh' />
      <Pagination total={500} pageSize={10} className='hhh' onChange={(p) => { console.log(p) }} />
      <Pagination total={4} pageSize={1} className='hhh' showQuickJumper onChange={(p) => { console.log(p) }} />
      <Page />
    </div>
  );
}

export default App;
