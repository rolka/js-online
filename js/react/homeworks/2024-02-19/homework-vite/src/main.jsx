import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Task1 } from "./components/Task1.jsx";
import data from './components/data.json'
import { Task12 } from "./components/Task12.jsx";
import componentData from "./components/componentData.js";
import { Task3 } from "./components/Task3.jsx";
import { Task4 } from "./components/Task4.jsx";
import { Task5 } from "./components/Task5.jsx";
import { Task6 } from "./components/Task6/Task6.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<App />*/}
    {/*  <Task1 data={data} />*/}
      <Task6/>
      <Task5/>
      <Task4>
          <>This is some content inside Task4 component.</>
      </Task4>
      {/*<Task4/>*/}
      <Task3 title='Title 3' color='#443b92' colorSetting={1}/>
      <Task12/>
      <Task1
          attribute1='txt'
          attribute2={44}
          attribute3={true}
          attribute4={new Date()}
          attribute5={ () => console.log('log from anonymous f') }
          attribute6={[ 1, 2, 3 ]}
          attribute7={{ name: 'Ro', surname: 'Za' }}
          attribute8={
            class Person{
                constructor (name, surname)
                {
                    this.name = name;
                    this.surname = surname;
                }
            }
          }
          // attribute9= {<Task12/>}
      />
  </React.StrictMode>,
)
