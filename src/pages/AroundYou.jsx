import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';

import { useGetSongsByCountryQuery } from '../redux/features/services/ShazamCore';

const AroundYou = () => {
  const [country, setcountry] = useState('');
  const [loading, setloading] = useState(true);
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_XXf2mG02nMblMllEXEvlfXbYuLbAI')
      .then((res) => setcountry(res?.data?.location?.country))
      .catch((err) => err)
      .finally(() => setloading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading Songs Around You" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2
        className="font-bold text-white text-4xl text-left mt-4 mb-10"
      >
        Around You in <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
