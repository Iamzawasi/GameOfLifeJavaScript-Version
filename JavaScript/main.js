container=document.getElementById("container");

function dynamicShape(){
    return Math.random()>0.5?true:false; // this will either return while or black cells 
}
matrixArray=[]
function create_Matrix(size=6){ //when size=6, then table=6x6...
    matrixArray=[]
    for(row=0;row<size;row++){
        tableRow=[];
        for(col=0;col<size;col++){
            getBol=dynamicShape();
            tableRow.push(getBol)
        }        
        matrixArray.push(tableRow);
    }
}

function create_HTML(){
    tableString="<table style='margin: auto;'>";
    for(row=0;row<matrixArray.length;row++){
        tableString+="<tr>";
        for(col=0;col<matrixArray[row].length;col++){
            tableString+="<th>";
            getResult=matrixArray[row][col];
            tableString+=(getResult)?"&#11035":"&#11036";
            tableString+="</th>";
        }
        tableString+="</tr>";
    }
    tableString+="</table>";
    return tableString;
}
function sum_up_neighbours(state, row, col){
    count=0;

            if(matrixArray[row+1]!=undefined){
                matrixArray[row+1][col]!=undefined && matrixArray[row+1][col]?count+=1:count=count;
                matrixArray[row+1][col+1]!=undefined && matrixArray[row+1][col+1]?count+=1:count=count;
                matrixArray[row+1][col-1]!=undefined && matrixArray[row+1][col-1]?count+=1:count=count;
            }
            if(matrixArray[row-1]!=undefined){
                matrixArray[row-1][col]!=undefined && matrixArray[row-1][col]?count+=1:count=count;
                matrixArray[row-1][col+1]!=undefined && matrixArray[row-1][col+1]?count+=1:count=count;
                matrixArray[row-1][col-1]!=undefined && matrixArray[row-1][col-1]?count+=1:count=count;
            }
            matrixArray[row][col-1]!=undefined && matrixArray[row][col-1]?count+=1:count=count;
            matrixArray[row][col+1]!=undefined && matrixArray[row][col+1]?count+=1:count=count;
    //console.log(row+" "+col+"=="+count);
    return count;
}

countfalse=0;
function check_change_state(){
    for(row=0;row<matrixArray.length;row++){
        for(col=0;col<matrixArray[row].length;col++){
            if(sum_up_neighbours(matrixArray[row][col], row, col)>3){
                if(matrixArray[row][col]==true){
                    matrixArray[row][col]=false;
                    state_change=true;
                    countfalse=0;
                }
                else{
                    countfalse+=1;
                }
            }else if(sum_up_neighbours(matrixArray[row][col], row, col)<3){
                if(matrixArray[row][col]==false){
                    matrixArray[row][col]=true;
                    countfalse=0;
                }
                else{
                    countfalse+=1;
                }
            }

        }
    }
}

create_Matrix(20);
container.innerHTML=create_HTML();
function change_status(){
    check_change_state();
    container.innerHTML=create_HTML();
    if(countfalse>(matrixArray.length*matrixArray.length)){
        create_Matrix(20);
        // clearInterval(startInterval);
    }
}
startInterval=setInterval(change_status, 300);
