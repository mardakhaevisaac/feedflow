import axios from 'axios';
import './style.css';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState(null);  
  const [content, setContent] = useState(null);
  const [posts, setPosts] = useState({});
  const [page, setPage] = useState('Home');

  async function newPost() {
    if (username === null || content === null) { 
        alert('Введите имя и свой пост!');
        return;
    }

    if (content.split('').length > 1600) {
        alert('Текст должен быть не больше 1600 символов!');
        return;
    }

    try {
        const response = await axios.post('http://localhost:1923/newPost', { username, content });
        await getPosts();
        setPage('Home');
    }
    catch (err) {
        console.error(err);
    }
}

  async function getPosts() {
    try {
      const response = await axios.get('http://localhost:1923/getPosts');
      setPosts(response.data);
    } 
    catch(err) {
      console.error(err);
    }   
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <div id='Header'>
        <p onClick={() => setPage('Home')} style={{
          fontSize: '260%',
          fontFamily: 'Franklin Gothic',
          display: 'inline-block',
          color: 'white'
        }}>FeedFlow</p>
        <div style={{display: 'inline-table', width: '60%'}} id='PageButtons'>
          <button className='pageButton' onClick={() => setPage('Home')}>Главная</button>
          <button className='pageButton' onClick={() => setPage('newPost')}>Написать пост</button>
          <button className='pageButton' onClick={() => alert('Скоро...')}>Аккаунт</button>
          <button className='pageButton' onClick={() => alert('Скоро...')}>О нас</button>
          <button className='pageButton' ><a style={{ color: 'white', textDecorationLine: 'none' }} href='https://t.me/lateinc'>Наше сообщество</a></button>
        </div>
      </div>
      <div id='Content'>
        {page === 'Home' ? (
          <div id='postsBlock'>
            <p class='Title'>Новые записи: </p>
            {
                Object.keys(posts).reverse().map((key) => (
                    <div className='postClass' key={key}>
                        <p className='usernameP'>От {posts[key].username} в {new Date(posts[key].date).toLocaleString()}</p>
                        <h2 className='contentP'>{posts[key].content}</h2>
                        <br></br>
                    </div>
                ))
            }
            <div><p style={{
                  fontFamily: 'Franklin Gothic',
                  fontSize: '160%',
                  textAlign: 'center',
                }}>Больше ничего нет...</p></div>
            </div>
        ) : (
          <div>
            <p class='Title'>Новый пост: </p>
            <textarea onChange={(event) => setContent(event.target.value)} placeholder='Что нового? :>'></textarea>
            <input onChange={(event) => setUsername(event.target.value)} placeholder='Ваше имя?'></input>
            <button className='defButton' onClick={newPost}>Отправить</button>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default App;
