import styles from '../Notes.module.css';

async function getNote(noteId) {
  try{
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await res.json();
    return data;
  } catch(err){
    console.error(err);
  }
}

// params id from URL
export default async function NotePage({ params }) {
//   console.log(params);
  const note = await getNote(params.id);

  return (
    <div>
      <h1>Notes ID: {note.id}</h1>
      <div className={styles.note} style={{ width:"100%"}}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}