onmessage = function(event){

  todos = event.data
  
  if (!Array.isArray(todos)) {
    console.log("todos are not an array");
  }

  else{
  this.postMessage(todos.length)
  }
}