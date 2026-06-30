function NoteItems({title, content, index, onDelete, onEdit}){

return (
    <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
    </div>
);

}

export default NoteItems;