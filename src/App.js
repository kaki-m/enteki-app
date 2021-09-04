import './App.css';
import mato from './images/mato.png';
import Hit from './Hit';
import React from 'react';
import arrow_cursor from './images/cursor_arrow.png';

export default class App extends React.Component{
    constructor(props){
        super(props);
        //参照をプロップスに定義する
        this.HitRef = React.createRef();
    }

    callInitialize(){
        this.HitRef.current.handleInitialize();
    }

    callHit(e){
        this.HitRef.current.handleCreateImg(e);
    }

    render(){
    const arrow_count = this.props.arrow_count;
    return (
    <div className="App" >
        <div className = "HitArea" 
        onClick = {this.callHit.bind(this)}
        >
            
            <img src={mato} className = "mato" />
            <Hit ref = {this.HitRef}/>
        </div>
        <button className = "initialize_button" onClick = {() => {this.callInitialize()}} >リセット</button>
    </div>
    );
}
}

