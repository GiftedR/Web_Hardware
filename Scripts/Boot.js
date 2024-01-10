"use strict";

let bitOS = 8; // Data Management
let bytesOS = 1024; // Memory Count

let pc_Mem_Count = bitOS * bytesOS; //Memory in bits
let pc_Mem = [false, false];
let crash = false;


function initMem(){
    for (let i = 0; i < pc_Mem_Count; i++){
        pc_Mem[i] = false;
    }
    if(pc_Mem.length == pc_Mem_Count){
        return true;
    }
    console.error(`Error: Mem is ${pc_Mem.length}bits and it should be ${pc_Mem_Count}bits`)
    return false;
}

function boot(){
    if (!initMem()){
        console.error("Memory Failed to initialize");
        return -1;
    }

    let bitDisplay = window.setInterval(updateDispBits, 30);
    let mainLoop = window.setInterval(main, 30);

    document.addEventListener("error", (error) =>{
        clearInterval(bitDisplay);
        clearInterval(mainLoop);
    })
}

//END BOOT
//BIT MANIP FUNCS

const DataTypes = {
    DT_BOOL : 0,
    DT_INT : 1,
    DT_UINT : 2,
    DT_FLOAT : 3,
    DT_UFLOAT : 4,
    DT_CHAR : 5
}

function setData(byte,data){
    switch(data){
        case DT_BOOL:
            
            break;
    }
}


//MAIN FUNCS
let bitWindow;
let canvas;
let ctx;
let dispBitSize = 2;
let winSize = [0, 0];

async function viewMem(){
    if (winSize[0] == 0){
        winSize[0] = 512 / dispBitSize
    }
    if (winSize[1] == 0){
        winSize[1] = (pc_Mem_Count / winSize[0]) * dispBitSize
    }

    const canvasStyle = `<style>
    #PC_MEM{
        width:${winSize[0]*dispBitSize}px;
        height:${winSize[1]*dispBitSize*2}px;
        overflow-y:scroll;
        image-rendering:pixelated;
    }
    </style>
    <canvas id='PC_MEM'></canvas>`;
    
    if (pc_Mem.length != pc_Mem_Count){
        console.error("Memory not initialized");
        return false;
    }
    bitWindow = window.open("", "PC_MEM", `width=512px,height=512px`);
    
    bitWindow.document.write(canvasStyle);
    
    canvas = bitWindow.document.getElementById("PC_MEM");
    ctx = canvas.getContext("2d");

    ctx.clientWidth = winSize[0] * dispBitSize;
    ctx.clientHeight = winSize[1] * dispBitSize;

    updateDispBits();
    return true;
}

async function updateDispBits(){
    if (ctx == null){
        viewMem();
    }
    for (let i = 0; i < pc_Mem_Count; i++){
        ctx.fillStyle = pc_Mem[i] ? "#0f0" : "#f00";
        ctx.fillRect(i % winSize[0] * dispBitSize, Math.floor(i / winSize[0]) * dispBitSize, dispBitSize, dispBitSize);
    }
}

function main() {
    
}