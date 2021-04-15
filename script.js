const cols = document.querySelectorAll('.square');
cols.forEach(col => {
    col.addEventListener('click', handleClick);
});

const rv1 = [0,0,0];
const rv2 = [0,0,0];
const rv3 = [0,0,0];

let xIsNext = true;
let filledBoxCounter = 0;

const updateBox = (row,rowId,colId) => {
    let dr = document.getElementById(rowId);
    if(row[colId-1] == 0){
        row[colId-1] = xIsNext ? 'X' :'O';
        let className = row[colId-1] == 'X' ? 'red' : 'black';
        dr.getElementsByClassName('square C'+colId)[0].innerHTML = '<p class="'+className+'">'+row[colId-1]+'</p>';
        filledBoxCounter++;
    }
    xIsNext = !xIsNext;
}

const reset = () => {
    let boxes = document.getElementsByClassName('square');
    for(let b = 0; b < boxes.length; b++){
        boxes[b].innerHTML = '';
    }
    for(let i = 0; i < 3; i++){
        rv1[i] = 0;
        rv2[i] = 0;
        rv3[i] = 0;
    }
}

function checkWinner(){
    if( rv1[0] === rv2[0] && rv1[0] === rv3[0]){
        return rv1[0] != 0 ? rv1[0] : null;
    } else if(rv1[1] === rv2[1] && rv1[1] === rv3[1]){
        return rv1[1] != 0 ? rv1[1] : null;
    } else if( rv1[2] === rv2[2] &&  rv1[2] === rv3[2]){
        return rv1[2] != 0 ? rv1[2] : null;
    }
    else if( rv1[0] === rv1[1] && rv1[0] === rv1[2]){
        return rv1[0] != 0 ? rv1[0] : null;
    } else if(rv2[0] === rv2[1] && rv2[0] === rv2[2]){
        return rv2[0] != 0 ? rv2[0] : null;
    } else if( rv3[0] === rv3[1] &&  rv3[0] === rv3[2]){
        return rv3[0] != 0 ? rv3[0] : null;
    }
    else if(rv1[0] === rv2[1] && rv1[0] === rv3[2]){
        return rv1[0] != 0 ? rv1[0] : null;
    } else if( rv1[2] === rv2[1] &&  rv1[2] === rv3[0]){
        return rv1[2] != 0 ? rv1[2] : null;
    } else {
        return null;
    }
}


function handleClick(e){
    let colId = e.srcElement.className.replace('square C','');
    let rowId = e.srcElement.parentNode.id;
    let r = rowId.replace('row','');
    let row = r == 1 ? rv1 : r == 2 ? rv2 : rv3;
    updateBox(row, rowId, colId);
    let symbol = checkWinner();
    if(symbol){
        alert( symbol + ' is the winner');
        reset();
    }
    if(filledBoxCounter === 9 && symbol === null){
        alert('Draw!');
        reset();
    }
}
