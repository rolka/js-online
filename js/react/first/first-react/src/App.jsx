import logo from './logo.svg';
import './App.css';

function Appo() {
  return (
      <div className="App">
        <p>asdasd</p>
      </div>
  );
}

const Button = () => {
  return <button className="red-bg">My baton</button>;
}
const App = () =>
{
    return (
        <div className="App">
            <p>asdasd</p>
            <Button/>
        </div>
    )
}
export default App;

// export default Appo;

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!
        </p>
        <p>Changed</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

