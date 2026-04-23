function saludar() {
  console.log('saludar');
  despedir(); 
}

function despedir() {
  console.log('despedir');
}

function main() {
  console.log('inicio');
  saludar();
  console.log('fin');
}

main();