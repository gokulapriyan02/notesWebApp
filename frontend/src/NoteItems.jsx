import "./styles.css"

function NoteItems({title, content, index, onDelete}){

return (
    <div id="note-card">
        <h1>{title}</h1>
        <p>{content}</p>
        <button onClick={onDelete}>Delete</button>
    </div>
);

}

export default NoteItems;