const input = document.getElementById('barcodeInput');
const output = document.querySelector('.barcode_text');

const prefixDiv = document.querySelector('.prefix');
const pluDiv = document.querySelector('.plu');
const weightDiv = document.querySelector('.weight');
const controlDigitDiv = document.querySelector('.control-digit')

const layoutMap = {
  'ф': 'a', 'и': 'b', 'с': 'c', 'в': 'd', 'у': 'e', 'а': 'f', 'п': 'g', 'р': 'h', 'ш': 'i', 'о': 'j',
  'л': 'k', 'д': 'l', 'ь': 'm', 'т': 'n', 'щ': 'o', 'з': 'p', 'й': 'q', 'к': 'r', 'ы': 's', 'е': 't',
  'г': 'u', 'м': 'v', 'ц': 'w', 'ч': 'x', 'н': 'y', 'я': 'z',
  'Ф': 'A', 'И': 'B', 'С': 'C', 'В': 'D', 'У': 'E', 'А': 'F', 'П': 'G', 'Р': 'H', 'Ш': 'I', 'О': 'J',
  'Л': 'K', 'Д': 'L', 'Ь': 'M', 'Т': 'N', 'Щ': 'O', 'З': 'P', 'Й': 'Q', 'К': 'R', 'Ы': 'S', 'Е': 'T',
  'Г': 'U', 'М': 'V', 'Ц': 'W', 'Ч': 'X', 'Н': 'Y', 'Я': 'Z'
};

function fixLayout(text) {
  return text.split('').map(char => layoutMap[char] || char).join('');
}


input.addEventListener('keydown', e => {

  if (e.key === 'Enter'){
    let text = input.value.trim();
    text = fixLayout(text);
    handleBarcode(text);
    input.value = '';

    console.log(text);

    const info = parseBarcode(text);
    console.log(info);
  }


});

function handleBarcode(text){
  output.innerText = `Штрих код: ${text}`;
}


window.onload = () => {
  input.focus();
  setInterval( ()=> {
    if (document.activeElement !== input) input.focus();
  }, 3000)
};

function parseBarcode(barcode){
  if (barcode.length !== 13) {
    throw new Error("Неверная длина")
  }

  const prefix = barcode.slice(0,3);
  const plu = barcode.slice(3,7);
  const weightRows = barcode.slice(7,12);
  const weightGrams = parseInt(weightRows, 10) / 1000;
  const controlDigit = barcode[12];

  prefixDiv.innerHTML = `Prefix: ${prefix}`;
  pluDiv.innerHTML = `PlU number: ${plu}`;
  weightDiv.innerHTML = `Weight in kg: ${weightGrams}`;
  controlDigitDiv.innerHTML = `Control digit: ${controlDigit}`;
  

  return {
    prefix, 
    plu, 
    weightGrams, 
    controlDigit
  }


}