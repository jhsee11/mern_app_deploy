import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      console.log('Starting to retrieve the api data');

      try {
        const res = await axios.get(
          `http://localhost:8080/api/lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTA5MDNiOWFlZDY2NTY3Y2QwMWVhMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTc5OTcxMiwiZXhwIjoxNjQ2MjMxNzEyfQ.-h32Q-qs0FfrFWHf1wbKTV_o0vT-GjQRT0lwM637VAM',
            },
          }
        );

        console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List key={i} list={list} />
      ))}
    </div>
  );
};

export default Home;
