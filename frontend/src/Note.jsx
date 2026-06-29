import { useState } from "react";
import NoteItems from "./NoteItems";
function Note(){

const [note, setNote] = useState({
    title: "",
    content: ""
});

const [noteItems, setNoteItems] = useState([]);

function storeNote(event){
    const {name, value} = event.target;
    setNote((prev) => ({...prev, [name]: value}) );


}

function addNote(){
    setNoteItems((prev) => ([...prev, note]));
    setNote({title:"", content:""});
}


    return(
        <div>
            <h1>Handy Notes</h1>
            <p>Write, Edit, Access at Anytime, Anywhere..!</p>
            <div>
                <h2>Write what's on your Mind!</h2>
                <input type="text" name="title" onChange={storeNote} value={note.title}/>
                <input type="text"  name="content" onChange={storeNote} value={note.content}/>
                <button onClick={addNote}>Add</button>
            </div>
            <div>
                {noteItems.map((item, index) =>{
                     return  <NoteItems title={item.title} content={item.content} key={index}/>
                })}
               
            </div>
        </div>
    );
}

export default Note;