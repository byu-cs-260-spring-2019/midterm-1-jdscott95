let app = new Vue({
  el: '#app',
  data: {
    books: [],
    current: '',
    searchString: '',
    show: 'all',
    drag: {},
    loading: false,
  },
  computed: {
    activeTodos() {
      return this.books.filter(item => {
        return !item.completed;
      });
    },
    filteredTodos() {
    if (this.show === 'active')
      return this.books.filter(item => {
       return !item.completed;
      });
    if (this.show === 'completed')
      return this.books.filter(item => {
        return item.completed;
       });
    return this.books;
  },
    typesList() {
      var listString = '';
      if (this.current.types[0] === undefined)
      return listString;
      else{
        for (let i = 0; i < this.current.types[0].length; i++)
      {
        listString += this.current.types[i].type.name;
        listString += ', '

      }
      console.log(this.current.types[0].length);
      return string;
    }
  },
  image() {
    var imageString = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.current.id +'.png';
    return imageString;
  },
   average() {
     if (this.ratings[this.current.id] === undefined)
    return 0;
      var average = this.ratings[this.current.id].sum / this.ratings[this.current.id].total;
     return average;
   }
 },

 watch: {
   number(value, oldvalue) {
       this.max = 807;
       this.xkcd();
     }
   },
  methods: {
    async searchBook() {
     try {
       this.loading = true;
       this.books = [];
       this.searchString = this.searchString.replace(/ /gi, "+");
       console.log(this.searchString);
       const response = await axios.get('https://openlibrary.org/search.json?q=' + this.searchString);
       this.current = response.data;
       console.log(response.data);
       this.loading = false;
       this.searchString = '';
       for(let i = 0; i < this.current.docs.length; i++)
       {
         var authorName = '';
         if(this.current.docs[i].author_name === undefined){
           authorName = '';
        }
         else {
           authorName = this.current.docs[i].author_name[0];
         }
         var publishDate = '';
         if(this.current.docs[i].publish_date === undefined){
           publishDate = '';
         }
        else {
          publishDate = this.current.docs[i].publish_date[0];
        }

          this.books.push({name: this.current.docs[i].title_suggest, author: authorName, year: publishDate,  completed:false});
       }
     } catch (error) {
       console.log(error);
     }
   },
   image() {
     var imageString = 'book.jpg';
     return imageString;
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
     this.books = this.books.filter(item => {
       return !item.completed;
     });
   },
   dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const indexItem = this.books.indexOf(this.drag);
      const indexTarget = this.books.indexOf(item);
      this.books.splice(indexItem,1);
      this.books.splice(indexTarget,0,this.drag);
    },
  }
});
