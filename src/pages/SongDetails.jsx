import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongsDetailsQuery, useGetSongsRelatedQuery } from '../redux/features/services/ShazamCore';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const SongDetails = () => {
  const { songid, id: artistId } = useParams();
  const { data: songData, isFetching: isFetchingSongData } = useGetSongsDetailsQuery(songid);
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongsRelatedQuery(songid);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePlayClick = ({ song, index }) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchingRelatedSongs || isFetchingSongData) return <Loader title="Searching Song Details" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white font-bold text-3xl">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS'
            ? songData.sections[1].text.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-3 md:text-xl ">{line}</p>
            )) : <p className="text-gray-400 text-base my-1">Sorry! No Lyrics Found.</p>}
        </div>
      </div>
      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default SongDetails;
