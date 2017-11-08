import React, { Component } from 'react';

class App2048 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : [[0,0,0,0],[2,2,0,0],[0,2,0,2],[2,2,2,2]],
      won : false,
      lost : false
    }
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  //create function generate random

  //need to finish function lost
  hasLostGame(pArray){
    let emptySquares = 0;
    for (let x=0; x<pArray.length; x++){
      for (let y=0; y<pArray[x].length; y++){
        if (pArray[x][y] === 0) {
          emptySquares += 1;
        }
      }
    }

    if (emptySquares === 0) { //if no empty squares
      let movesAvailables = 0;
      //check if no moves possibles
      for (let a=1; a<pArray.length; a++){
        for (let b=0; b<pArray[a].length; b++){
          if(pArray[a-1][b]===pArray[a][b]){
            movesAvailables += 1;
          }
        }
      }
      for (let m=0; m<pArray.length; m++){
        for (let n=1; n<pArray[m].length; n++){
          if(pArray[m][n-1]===pArray[m][n]){
            movesAvailables += 1;
          }
        }
      }
    } //empty square available

  }

  hasWonGame(pArray){
    for (let x=0; x<pArray.length; x++){
      for (let y=0; y<pArray[x].length; y++){
        if (pArray[x][y] === 2048){
          this.setState({
            won : true,
            lost : false
          });
          // console.log('gagné'); //ok
          // win message and reset state
        }
      }
    }
  }

  mouvementUp(pArray) { //ok
    let arrayChanged = [];
    arrayChanged = pArray;
    for (let k=0; k<arrayChanged.length; k++){
      for (let l=0; l<arrayChanged[k].length; l++){
          switch(k){
            case 0: {
              if(arrayChanged[k][l]===0){
                if(arrayChanged[k+1][l]===0){
                  if (arrayChanged[k+2][l]===0){
                    if (arrayChanged[k+3][l]!==0){
                      arrayChanged[k][l] = arrayChanged[k+3][l];
                      arrayChanged[k+3][l] = 0;
                    } // row empty, do nothing
                  } else { // [k+2][l] != 0 // k & k+1 =0
                    if (arrayChanged[k+2][l] === arrayChanged[k+3][l]){
                      arrayChanged[k][l] = arrayChanged[k+2][l]*2;
                      arrayChanged[k+2][l] = arrayChanged[k+3][l] = 0;
                    } else { // [k+2][l] !=  [k+3][l]
                      arrayChanged[k][l] = arrayChanged[k+2][l];
                      arrayChanged[k+1][l] = arrayChanged[k+3][l];
                      arrayChanged[k+2][l] = arrayChanged[k+3][l] = 0;
                    }
                  }
                } else { // [k+1][l] != 0 //k = 0
                  if (arrayChanged[k+1][l]===arrayChanged[k+2][l]){
                    arrayChanged[k][l] = arrayChanged[k+1][l]*2;
                    arrayChanged[k+1][l] = arrayChanged[k+3][l];
                    arrayChanged[k+2][l] = arrayChanged[k+3][l] = 0;
                  } else if (arrayChanged[k+2][l]===arrayChanged[k+3][l]){
                      arrayChanged[k][l] = arrayChanged[k+1][l];
                      arrayChanged[k+1][l] = arrayChanged[k+2][l]*2;
                      arrayChanged[k+2][l] = arrayChanged[k+3][l] = 0;
                  } else if ((arrayChanged[k+1][l] === arrayChanged[k+3][l]) && (arrayChanged[k+2][l]===0)){
                    arrayChanged[k][l] = arrayChanged[k+1][l]*2;
                    arrayChanged[k+1][l] = arrayChanged[k+2][l] = arrayChanged[k+3][l] = 0;
                  } else {
                    arrayChanged[k][l] = arrayChanged[k+1][l];
                    arrayChanged[k+1][l] = arrayChanged[k+2][l];
                    arrayChanged[k+2][l] = arrayChanged[k+3][l];
                    arrayChanged[k+3][l] = 0;
                  }
                }
              } else {// [k][l] != 0
                //le gros bordel recommence ici....
              }
              break;
            }/*
            case 1: {

              break;
            }
            case 2: {

              break;
            }
            case 3: {

              break;
            }*/
            default: {
              break;
            }
        }
      }
    }
    return arrayChanged;
  }

  mouvementDown(pArray) {
    let arrayChanged = [];
    arrayChanged = pArray;
    for (let k=0; k<arrayChanged.length; k++){
      let temp = arrayChanged[k];
      for (let l=0; l<temp.length; l++){
        temp[l] -= 2;
      }
    }
    return arrayChanged;
  }

  mouvementLeft(pArray) {
    let arrayChanged = [];
    arrayChanged = pArray;
    for (let k=0; k<arrayChanged.length; k++){
      let temp = arrayChanged[k];
      for (let l=0; l<temp.length; l++){
        temp[l] = 0;
      }
    }
    return arrayChanged;
  }

  mouvementRight(pArray) {
    let arrayChanged = [];
    arrayChanged = pArray;
    for (let k=0; k<arrayChanged.length; k++){
      let temp = arrayChanged[k];
      for (let l=0; l<temp.length; l++){
        temp[l] += temp[l];
      }
    }
    return arrayChanged;
  }
  onKeyPressed(e) {
    // console.log(e.keyCode); //return a number
    /*
      * 37 : left
      * 38 : up
      * 39 : right
      * 40 : down
    */
    let squareState = this.state.squares;
    let moved = [];
    switch(e.keyCode) {
      case 37 : {
        moved = this.mouvementLeft(squareState);
        break;
      }
      case 38 : {
        moved = this.mouvementUp(squareState);
        // moved = this.mouvementUp(squareState);
        // moved = this.mouvementUp(squareState);
        //call generate random here
        //call lost here
        this.hasWonGame(moved);
        break;
      }
      case 39 : {
        moved = this.mouvementRight(squareState);
        break;
      }
      case 40 : {
        moved = this.mouvementDown(squareState);
        break;
      }
      default : {
        moved = squareState;
      };
    }

    this.setState({
      squares : moved
    });
  }

  render() {
    let affichage = [];
    for (let i=0; i<4; i++){
      affichage.push(<div key={i} className='ligne'></div>);
      for (let j=0; j<4; j++) {
        let nomClass = 'square num num' + this.state.squares[i][j];
        affichage.push(<div key={i+','+j} className={nomClass} id={i+','+j}>{this.state.squares[i][j]}</div>);
      }
    }
    return (
      <div className='main'
        onKeyDown={this.onKeyPressed}>
        {
          affichage
        }
      </div>
    );
  }
}

export default App2048;
