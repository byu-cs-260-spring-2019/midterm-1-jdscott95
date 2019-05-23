document.getElementById("bookSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("bookInput").value;
  if (value === "")
    return;
    const fixedValue = value.replace(/ /gi, "+");
  console.log(fixedValue);
  try{
    const url = "https://openlibrary.org/search.json?q=" + fixedValue;
    fetch(url)
  .then(function(response) {
  return response.json();
}).then(function(json) {
  console.log(json);
let results = "";

for (let i = 0; i < json.docs.length; i++)
{
results += '<h2>Book name: ' + json.docs[i].title_suggest + '</h2>';
results += '<p> Author(s): ' + json.docs[i].author_name + '</p>';
results += '<p> Publish date(s): ' + json.docs[i].publish_date;
}
/*esults += json.types[i].type.name
if (i !== json.types.length - 1)
results += ", "
}
results += '<p> Moves: ';""
for (let i=0; i < json.moves.length; i++) {
results += json.moves[i].move.name
if (i !== json.moves.length - 1)
results += ", "
}
results += '<p> Abilities: ';
for (let i=0; i < json.abilities.length; i++) {
results += json.abilities[i].ability.name
if (i !== json.abilities.length - 1)
results += ", "
}
for (let i=0; i < json.weather.length; i++) {
results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/ class = "center">';
}
results += '<h2>' + json.main.temp + " &deg;F</h2>"
results += "<p>"
for (let i=0; i < json.weather.length; i++) {
results += json.weather[i].description
if (i !== json.weather.length - 1)
results += ", "
}*/
 results += "</p>";
document.getElementById("bookInfo").innerHTML = results;
})
}
    catch(err){};
});

var app = new Vue({
  el: '#app',
  data: {
    todos: [{
      text: "make an app",
      completed: false,
    }, {
      text: "declare victory",
      completed: false,
    }, {
      text: "profit",
      completed: false
    }],
    message: '',
    show: 'all',
    drag: {},
  },

  computed: {
      activeTodos() {
        return this.todos.filter(item => {
          return !item.completed;
        });
      },
      filteredTodos() {
      if (this.show === 'active')
        return this.todos.filter(item => {
         return !item.completed;
        });
      if (this.show === 'completed')
        return this.todos.filter(item => {
          return item.completed;
         });
      return this.todos;
    },
    },


methods: {
   addItem() {
     this.todos.push({text: this.message, completed:false});
     this.message = '';
   },
 deleteItem(item) {
     var index = this.todos.indexOf(item);
     if (index > -1)
       this.todos.splice(index,1);
   },
   showAll() {
     this.show = 'all';
   },
   showActive() {
     this.show = 'active';
   },
   showCompleted() {
     this.show = 'completed';
   },
   deleteCompleted() {
     this.todos = this.todos.filter(item => {
       return !item.completed;
     });
   },
   dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const indexItem = this.todos.indexOf(this.drag);
      const indexTarget = this.todos.indexOf(item);
      this.todos.splice(indexItem,1);
      this.todos.splice(indexTarget,0,this.drag);
    },
 }
});
