import Axios from '../lib/axios';

const axios = new Axios();

console.log(axios);

function Home() {
  return (
    <h1 className="text-3xl font-bold underline text-center text-red-500">
      Hello world!
    </h1>
  );
}

export default Home;
