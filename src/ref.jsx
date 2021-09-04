import logo from './images/header_image.png';
import './App.scss';
import React from 'react';
import Test from './Test';
import ContactMe from './ContactMe';
import bow from './images/bow.png';
import arrows from './images/arrows.png';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sayHello:null,
            contactMe:null,
        }
    }
    handleOpenIntroduction(){
        this.setState({sayHello:Test});
    }
    handleOpenContactMe(){
        this.setState({contactMe:ContactMe});
    }
    randomArrow(){

    }
  render(){
      const {sayHello} = this.state;
      const {contactMe} = this.state;
      if(contactMe){{/*contactMeが押された時には*/}
          return (
              <div className="App">
                  <div className = "move_bow" onClick = {() => {this.randomArrow()}}>
                <img src = {bow} className = "bowimg"/>{/*画像動かせるようにした*/}
             </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className = "title">
          柿崎愛斗のポートフォリオサイト
        </p>
        <div className = "hello_div">
        <button className = "hellobutton" onClick = {() => {this.handleOpenIntroduction()}}>こんにちは！</button>
        </div>
      </header>
      <body>
      <Test />
      <div className = "contact_div">
        <button className = "contactbutton" onClick = {() => {this.handleOpenContactMe()}}>ContactMe！</button>
      </div>
      <div className = "contact_botton_div">
        <img src = {arrows} className = "arrows_2" />
      </div>
      </body>
        <footer>
            <ContactMe />
        </footer>
        
        </div>
          );
      }{  /*こんにちはボタンが押された時には*/}
      if(sayHello) {return (    
      <div className="App">
            <div className = "move_bow" onClick = {() => {this.randomArrow()}}>
                <img src = {bow} className = "bowimg"/>
            </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className = "title">
          柿崎愛斗のポートフォリオサイト
        </p>
        <div className = "hello_div">
        <button className = "hellobutton" onClick = {() => {this.handleOpenIntroduction()}}>こんにちは！</button>
        </div>
        <img src = {arrows} className = "arrows" />
      </header>
      
      <body>
      <Test />

      <div className = "contact_div">
        <button className = "contactbutton" onClick = {() => {this.handleOpenContactMe()}}>ContactMe！</button>
      </div>
      </body>

    </div>
    
  );
      }
    return (
    <div className="App">

        
        <img src = {bow} className = "bowimg" />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className = "title">
          柿崎愛斗のポートフォリオサイト
        </p>
        <div className = "hello_div">
        <button className = "hellobutton" onClick = {() => {this.handleOpenIntroduction()}}>こんにちは！</button>
        </div>
      </header>
      
    </div>
    );
    }
}
