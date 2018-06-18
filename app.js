
class ToDosContainer extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     heading: 'Something You Need To Do?',
     todos: [

     ],
   }

   this.addToDo = this.addToDo.bind(this)
   this.deleteMe = this.deleteMe.bind(this)
 }

 addToDo(todo) {
   const objToday = new Date(),

   weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
 dayOfWeek = weekday[objToday.getDay()],
 dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate(),
 months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
 curMonth = months[objToday.getMonth()],
 curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? " " + objToday.getHours() : objToday.getHours()),
 curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
 curMeridiem = objToday.getHours() > 12 ? "pm" : "am";

 const today = curHour + ":" + curMinute + " " + curMeridiem + ", " + curMonth + " " + dayOfMonth;


   this.setState((state) => ({
     todos: state.todos.concat([todo +  ' ☺ added ' + today ])
   }))
 }

   deleteMe(key) {

     // spread for immutablility
     const todos = [...this.state.todos]

     // removes a single instance, at this index of array
     todos.splice(key, 1)

     // set the state with the new todos
     this.setState({
       todos: todos,
     })

     console.log("delete me!");
   }

 render() {
   return (
     <div>

       <h3>{this.state.heading}</h3>
       <AddToDo addNew={this.addToDo} />
       <ShowList deleteTask={this.deleteMe} tasks={this.state.todos} />
     </div>
   )
 }
}

class AddToDo extends React.Component {
 constructor(props) {
   super(props)

   this.state = {
     newToDo: ''
   }

   this.updateNewToDo = this.updateNewToDo.bind(this)
   this.handleAddToDo = this.handleAddToDo.bind(this)

 }


 updateNewToDo(e) {

   this.setState({
     newToDo: e.target.value
   })
 }

 handleAddToDo() {

   this.props.addNew(this.state.newToDo)
   this.setState({
     newToDo: ''
   })
 }

 render() {
   return (
     <div>
       <input
         type="text"
         value={this.state.newToDo}
         onChange={this.updateNewToDo}
        />
       <button onClick={this.handleAddToDo}> Add To Do </button>
     </div>
   )
 }
}

class Task extends React.Component {

 state = {
   text: ""
 };

 onMouseOver(e) {
   this.setState({
     text: "all done!"
   });
 }

 onMouseOut(e) {
   this.setState({
     text: ""
   });
 }

 render() {

   return (
     <li
       onClick={() => this.props.delete(this.props.index)}
       onMouseEnter={this.onMouseOver.bind(this)}
       onMouseLeave={this.onMouseOut.bind(this)}
     >
       {this.props.todo} {this.state.text}
     </li>
   );
 }
}


class ShowList extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
     newToDo: ""
   };
 }

 render() {
   const { text } = this.state;
   const { deleteMe } = this.props;

   return (
     <div>
       <h4>To Do's</h4>
       <ul>
         {this.props.tasks.map((todo, key) => {
           return <Task key={`todo-${key}-${todo}`} index={key} delete={this.props.deleteTask} todo={todo} />;
         })}
       </ul>
     </div>
   );
 }
}

ReactDOM.render(<ToDosContainer />, document.getElementById('helloworld')); 
