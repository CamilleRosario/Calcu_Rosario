const display =document.querySelector("#currdisplay");
const prevdisplay =document.querySelector("#prevdisplay");
const buttons =document.querySelectorAll("button");
const historyctnr = document.querySelector("#history");
const specialChar = ["*", "/", "-", "+", "exp"];
const digitsChar = [".","00","0","1", "2", "3", "4","5","6","7","8","9"];
let output= "";
let current = "";
let eq = "";
let ans = "";
let equation = "";
let history = [];

function append(value) {
    if(current.includes("√") && specialChar.includes(value)){
      /**To compute the square root of the number first before adding to equation */
        eq += current + value;
        let data = parseFloat(current.slice(1));
        const result = Math.sqrt(data);
        equation += result.toString() + value;
        current = "";
        prevdisplay.value = equation;
    }
    else if (specialChar.includes(value) && current.length > 0){
        if(value == "exp"){
          /**To compute the squared of the number first before adding to equation */
            let squared = Math.pow(parseFloat(current), 2);
            current = squared.toString();
        }
        else{
            equation += current + value;
            eq += current + value;
            current = "";
            prevdisplay.value = equation;
        }
        prevdisplay.value = equation;
        display.value = current;
    }
    else {
        current += value;
        display.value = current;
    }
  }
  /**To prevent user from calculating when the last character of the string equation is an operator */
  function compute(){
    if(!specialChar.includes(equation.charAt(equation.length-1)) || 
    equation.charAt(equation.length-1) !== "√"){
      calculate();
    }
  }
  function calculate() {
    try {
        let result = "";
        equation += current;
        /**For square root operations only */
        if(equation.charAt(0) === "√"){
          let data = parseFloat(current.slice(1));
          result = Math.sqrt(data);
          eq += current + "=" + result.toString();
        }
        /**For equations with square root as last operation */
        else if(equation.includes("√")){
          let parts = equation.split("√");
          let data = Math.sqrt(parseFloat(parts[1]));
          result = eval(parts[0]+data);
          eq += current + "=" + result;
        }
        else {
          
          result = eval(equation);
          console.log(result);
          eq += current + "=" + result.toString();
        }
      prevdisplay.value = "";
      display.value = result;
      createHistory(eq);
      current = '';
      equation = '';
      eq = '';
    } catch (error) {
    display.value = 'Error';
    }
  }
  
  function clearEntry() {
    current = '';
    equation = '';
    eq= "";
    display.value = '';
    prevdisplay.value = "";
  }
  
  function clearAll() {
    history = [];
    current = '';
    equation = '';
    eq = "";
    display.value = '';
    prevdisplay.value = "";
  }

  function backspace(){
    current = display.value;
    display.value= current.slice(0, -1);
  }
  
  function toggleSign() {
    let num = parseFloat(current);
    num = num * -1;
    current = num.toString();
    display.value = current;
  }
  
  function squareRoot() {
    if(current.length === 0){
        current += "√";
        display.value = current;
    }
  }

  function percentage(){
    if(current.length > 0){
        let data = parseFloat(current)*0.01;
        current = data.toString();
        display.value = current;
    }
  }
  function createHistory(txt){
    const data = document.createElement("p");
    data.classList.add("data_history");
    data.textContent = txt;
    historyctnr.appendChild(data);
  }



 