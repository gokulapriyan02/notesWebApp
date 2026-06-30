import { useEffect, useState } from "react";
import NoteItems from "./NoteItems";
import "./styles.css"
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

async function addNote(){
    const result = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    const data = await  result.json();
    setNoteItems((prev) => ([...prev, data]));
    setNote({title:"", content:""});
}

async function handleDelete(key){
        const result = await fetch("http://localhost:3000/delete", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({id : key})
        })
        const dataToDelete =  await result.json();

        setNoteItems((prev) => {
           return  prev.filter((items) =>{
                  return  items.id !== dataToDelete.id;
           })
        });
}

 useEffect(  () =>{ 
    const fetchNote = async() => {
            const response = await fetch("http://localhost:3000");
            const data = await response.json();
            setNoteItems(data);
    }   
    
    fetchNote();
}, [noteItems]);


    return(
        <div>
            <h1 id="title">Handy Notes</h1>
            <p id="title-para">Write, Edit, Access at Anytime, Anywhere..!</p>
            <div id="input-container">
                <h2>Write what's on your Mind!</h2>
                <input type="text" name="title" onChange={storeNote} value={note.title} placeholder="Note Title"/>
                <input type="text"  name="content" onChange={storeNote} value={note.content} placeholder="Note Content"/>
                <button onClick={addNote}>Add</button>
            </div>
            <div id="note-container">
                {noteItems.map((item, index) =>{
                     return  <NoteItems title={item.title} content={item.content} key={item.id} onDelete={() => handleDelete(item.id)}/>
                })}
               
            </div>
        </div>
    );
}

export default Note;