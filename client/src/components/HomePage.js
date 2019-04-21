import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    return (
        <div id="homepage_hero" >
          <svg className="Rectangle_395" style={rect395ClassStyle}>
               <rect id="Rectangle_395" style={rect395IdStyle} rx="0" ry="0" x="0" y="0" width="1920" height="1080">
               </rect>
            </svg>
         <div id="Sumergite" style={sumergiteTitleStyle}>
              <span>Sumergite</span>
           </div>
           <div id="Log_in" style={LogInStyle } >
              <span onClick={myFunction()}>Log in</span>
           </div>
    
         <div id="Group_48" style={group48Style} >
            <svg className="Rectangle_90" style={rec90ClassStyle}>
                <rect id="Rectangle_90" style={rec90IdStyle} rx="25" ry="25" x="0" y="0" width="130" height="50">
                </rect>
            </svg>
            <div id="Register" style={registerStyle}>
                <span>Register</span>
            </div>
        </div>
    
    
      <div id="Group49" style={group49Style}>
            <div id="BigButton" style={bigButtonSyle}>
                <svg className="Rectangle_9018" style={rec9018ClassSyle}>
                    <rect id="Rectangle_9018" style={rec9018IdStyle} rx="30" ry="30" x="0" y="0" width="190" height="60">
                    </rect>
                </svg>
            </div>
            <div id="Start_now" style={startNowStyle}>
                <span>Start now</span>
            </div>
        </div>
    
      <div id="Create_your_company_in_less_th" style={createyourCompanyStyle}>
            <span>Create your company in less than a day</span>
        </div>
    
      <div id="ourFirm" style ={ourFirmStyle}>
            <span> team team team team team team team team team team team team team  </span>
        </div>
    
    
      <div id="ArrowA1 " style={arrowInstanseStyle} >
                <svg className="Path_7_A1_Path_2" viewBox="8.719 12.382 59.679 33.831" style={arrowStyleClass}>
                    <path id="Path_7_A1_Path_2" style={arrowStyleId} d="M 61.59608840942383 13.55010986328125 L 38.55812454223633 36.60403823852539 L 15.5201530456543 13.55010986328125 C 13.96456623077393 11.99258518218994 11.44176864624023 11.99258518218994 9.885747909545898 13.54968070983887 C 8.329729080200195 15.10677909851074 8.329733848571777 17.63132476806641 9.885747909545898 19.18841934204102 L 35.72918319702148 45.04890060424805 C 36.47779846191406 45.80119323730469 37.49721908569336 46.22072982788086 38.55812454223633 46.21315383911133 C 39.61861038208008 46.21848678588867 40.63718795776367 45.79928970336914 41.3870735168457 45.04889297485352 L 67.23007965087891 19.1879940032959 C 68.78652191162109 17.63132476806641 68.78652191162109 15.10677909851074 67.23049163818359 13.54968738555908 C 65.67447662353516 11.99259185791016 63.15168762207031 11.99258804321289 61.59566116333008 13.54968070983887 Z">
                    </path>
                </svg>
            </div>
        
    
    
          </div>
          
        );
      }
    }
    
    const rect395ClassStyle={
      position: 'absolute',
      overflow: 'visible',
      width: '1920px' ,
      height: '1080px' ,
      left: '0px',
      top: '0px'
    }
    const rect395IdStyle={
      opacity: '1',
            fill:'#3480e3' 
    }
    
    const sumergiteTitleStyle={
     
            opacity: '1',
            position: 'absolute',
            left:' 278px',
            top: '44px',
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            overflow: 'visible',
            width: '133px',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '28px',
            color: 'rgba(255,255,255,1)'
        
    }
    const LogInStyle={
      opacity: '1',
            position: 'absolute',
            left: '1438px',
            top: '51px',
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            overflow: 'visible',
            width: '47px',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            fontFamily: 'SF Pro Display',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '17px',
            color: 'rgba(255,255,255,1)'
    }
    
    const group48Style= {
      opacity: '1',
      position: 'absolute',
      width: '130px',
      height: '50px',
      left: '1512px',
      top: '36px',
      overflow: 'visible',
    }
    const rec90IdStyle={
      opacity: '1',
            fill: 'rgba(229,49,103,1)'
    }
    const rec90ClassStyle={
      position: 'absolute',
      overflow: 'visible',
      width: '130px',
      height: '50px',
      left: '0px',
      top: '0px'
    }
    const registerStyle={
        opacity: '1',
          position: 'absolute',
          left: '35px',
          top: '15px',
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          overflow: 'visible',
          width: '66px',
          whiteSpace: 'nowrap',
          textAlign: 'left',
          fontFamily: 'SF Pro Display',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '17px',
          color: 'rgba(255,255,255,1)'
    }
    const group49Style={
      opacity: '1',
            position: 'absolute',
            width: '190px',
            height: '60px',
            left: '278px',
            top: '685px',
            overflow: 'visible'
    }
    const bigButtonSyle={
      opacity: '1',
            position: 'absolute',
            width: '190px',
            height: '60px',
            left: '0px',
            top: '0px',
            overflow: 'visible'
    }
    const rec9018IdStyle={
      opacity: '1',
            fill: 'rgba(229,49,103,1)'
    }
    const rec9018ClassSyle={
      position:'absolute',
      overflow: 'visible',
      width: '190px',
      height: '60px',
      left: '0px',
      top: '0px'
    }
    const startNowStyle={
      opacity:'1',
      position:'absolute',
      left: '60px',
      top: '20px',
      boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          overflow: 'visible',
          width: '75px',
          whiteSpace: 'nowrap',
          textAlign: 'left',
          fontFamily: 'SF Pro Display',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '17px',
          color: 'rgba(255,255,255,1)'
    }
    const createyourCompanyStyle={
      opacity:'1',
      position:'absolute',
      left: '278px',
      top: '364px',
      boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          width: '683px',
          height :'176px',
          textAlign: 'left',
          fontFamily: 'SF Pro Display',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '65px',
          color: 'rgba(255,255,255,1)'
    }
    const ourFirmStyle={
      opacity:'1',
      position:'absolute',
      left: '278px',
      top: '557px',
      boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          width: '537px',
          height :'88px',
          lineHeight :'27px',
          marginTop: '-5px',
          textAlign: 'left',
          fontFamily: 'SF Pro Display',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '17px',
          color: 'rgba(255,255,255,1)'
    }
    const arrowInstanseStyle={
      opacity: '1',
            position: 'absolute',
            width: '59.679px',
            height: '33.831px',
            left: '0px',
            top: '0px',
            overflow: 'visible'
    }
    const arrowStyleId={
      opacity: '1',
            fill: 'rgba(255,255,255,1)'
    }
    const arrowStyleClass={
      transform: 'matrix(1,0,0,1,0,0)',
      overflow: 'visible',
      position: 'absolute',
      top: '1000px',
      left: '300px',
      width: '59.679px',
      height: '33.831px'
    }
     function myFunction(){
      console.log("ahmed");
    }
