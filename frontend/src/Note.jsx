import { useEffect, useState } from "react";
import NoteItems from "./NoteItems";
function Note(){

const  [id, setId] = useState(null);
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

            if (id === null){

                    const result = await fetch("http://localhost:3000", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(note)
                    });
                    const data = await  result.json();
                    setNoteItems((prev) => ([...prev, data[0]]));
                    setNote({title:"", content:""});
        }
        else{
            const result = await fetch("http://localhost:3000",{
                                    method: "POST",
                                    headers: {"Content-Type" : "application/json"},
                                    body: JSON.stringify({...note, id: id})
        });

                const data = await result.json();
                setNoteItems((prev) => {
                  return   prev.map((item) => {
                            if (item.id === id){
                              return  data;
                            }
                            else{
                                return item;
                            }
                            });
                });
                setNote({title: "",content: ""});
                setId(null);
                
        }
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

async function handleEdit (id) {
    const oldNote = await fetch("http://localhost:3000/edit",{
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({id: id})
    });
    const data = await oldNote.json();

    setNote({title: data[0].title, content: data[0].content});
    setId(data[0].id);
}
 useEffect(  () =>{ 
    const fetchNote = async() => {
            const response = await fetch("http://localhost:3000");
            const data = await response.json();
            setNoteItems(data);
    }   
    
    fetchNote();
}, []);


    return(
        <div>
            <h1>Handy Notes</h1>
            <p>Write, Edit, Access at Anytime, Anywhere..!</p>
            <div>
                <h2>Write what's on your Mind!</h2>
                <input type="text" name="title" onChange={storeNote} value={note.title} />
                <input type="text"  name="content" onChange={storeNote} value={note.content}/>
                <button onClick={addNote}>Add</button>
            </div>
            <div>
                {noteItems.map((item, index) =>{
                     return  <NoteItems 
                                    title={item.title} content={item.content} key={item.id} 
                                    onDelete={() => handleDelete(item.id)}
                                    onEdit ={() => handleEdit(item.id)}/>
                })}
               
            </div>
        </div>
    );
}

export default Note;