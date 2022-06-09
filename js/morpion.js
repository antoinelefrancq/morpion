const app={
    gridsize:3,
    pixelsize:100,
    boardHtmlElement:null,
    celltag:[
        "cell--mark",
        "cell--circle"
    ],
    carreMagique:[2,7,6,9,5,1,4,3,8],
    winresult:0,
    gameOver:false,
    
    markfill:()=>{
        let randomCell=[Math.floor(Math.random() * ((app.carreMagique.length+1)-1)+1)];
        randomCell=randomCell.toString()
        const currentCell=document.getElementById(randomCell)
        let mark = document.getElementsByClassName(app.celltag[0])
        let circle = document.getElementsByClassName(app.celltag[1])
        if (mark.length+circle.length<9){
            if (currentCell.classList.contains(app.celltag[0]) || currentCell.classList.contains(app.celltag[1])) {
                app.markfill()
            } else{
                currentCell.classList.add(app.celltag[0])
            }
        } else { setTimeout(() => {
            alert('Ex-aequo, try again');
          }, 500);
            
        }
    },

    winCheck:(value)=>{
        app.winresult=0
        let research = (document.getElementsByClassName(app.celltag[value]))
        if (research.length>2){
            for(let i=0;i<(research.length-2);i++){
                for(let j=i+1;j<(research.length-1);j++){
                    for(let k=j+1;k<(research.length);k++){
                        if((parseInt(research[i].id)+parseInt(research[j].id)+parseInt((research[k]).id))===15){
                            if(value===1){
                                setTimeout(() => {
                                    alert('Bravo, tu as réussi !!');
                                  }, 500);
                            } else if (value===0){
                                setTimeout(() => {
                                    alert('You lose, try again');
                                  }, 500);
                            }
                            return app.gameOver=true
                        }                         
                    }
                }
                
            }
                
        }
    },
 

    handleCellClicked(event){
        if (app.gameOver){
            return
        }
        app.winresult=0
        let cellClicked = event.target
        if (cellClicked.classList.contains(app.celltag[0]) || cellClicked.classList.contains(app.celltag[1])) {} else{
            cellClicked.classList.add(app.celltag[1])
            app.winCheck(1)
            if (app.gameOver===false){
                app.markfill()
                app.winCheck(0)
            }
            
        }


            
    },

    drawgrid:(tableSize, caseSize)=>{
        magiqueclass=0
        app.boardHtmlElement.innerHTML = " "
        // let rowNumber=null
        // let columnNumber=null
        for(let i=0;i<tableSize;i++){
            // rowNumber=(i+1)
            const rowHtmlElement = document.createElement('div')
            rowHtmlElement.classList.add('row')
            app.boardHtmlElement.appendChild(rowHtmlElement)

            for(let j=0; j<tableSize;j++){
                columnNumber=(j+1)
                const cellHtmlElement = document.createElement('div')
                cellHtmlElement.classList.add('cell')
                cellHtmlElement.id=(app.carreMagique[magiqueclass])
                // cellHtmlElement.classList.add(`row-${rowNumber}`)
                // cellHtmlElement.classList.add(`column-${columnNumber}`)
                cellHtmlElement.style.width=`${caseSize}px`
                cellHtmlElement.style.height=`${caseSize}px`
                cellHtmlElement.addEventListener('click', app.handleCellClicked)
                rowHtmlElement.appendChild(cellHtmlElement)
                magiqueclass++
            }
        }

    },

    playagain:()=>{
        app.gameOver=false
        let replay = document.getElementById("replayButton")
        replay.addEventListener("click",app.init)
        
    },



    init: ()=>{
        app.boardHtmlElement = document.getElementById("board");
        app.drawgrid(app.gridsize, app.pixelsize)
        app.playagain()
    },
}

document.addEventListener('DOMContentLoaded', app.init);
