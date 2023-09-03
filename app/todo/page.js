import CreateTODO from './CreateTODO';
import styles from './TODO.module.css';

async function getTODOList() {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // const result = await db.records.getList('notes');
    const res = await fetch('http://127.0.0.1:8090/api/collections/todo/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    // console.log(data);
    return data?.items;
  }

export default async function TODOList() {
    const todoList = await getTODOList();
    console.log(todoList);
    return(
        <div>
            <h1>To-Do List</h1>
            <CreateTODO />
            list:
            <div className={styles.itemList}>
                {todoList?.map((item) => {
                return <TODO key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
}

function TODO({ item }) {
    const { id, title, date, completed } = item;
  
    return (

        <>
          <div>{title}</div>
          <div>{date}</div>
          <div>{completed?"true":"false"}</div>
        </>
    );
  }