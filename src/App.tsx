import { NormalizeOAS, OASOutput } from "fets";
import type { openapi } from "./api/openapi";
import { useEffect, useState } from "react";
import { client } from "./api/client";

type Artist = OASOutput<
  NormalizeOAS<typeof openapi>,
  "/artists/{id}",
  "get",
  "200"
>;

function App() {
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    client["/artists/{id}"]
      .get({
        params: { id: "1KCSPY1glIKqW2TotWuXOR" },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_SPOTIFY_TOKEN}}`,
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Something went wrong");
      })
      .then((artist) => {
        setArtist(artist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!artist) {
    return <>Loading...</>;
  }

  return (
    <div className="grid justify-center content-center h-screen w-screen">
      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow p-10">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={artist.images?.[0].url}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {artist.name}
          </h5>
          <span className="text-sm text-gray-500">
            {artist.followers?.total ?? 0} followers
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
              Follow
            </button>
            <a
              href={artist.external_urls?.spotify}
              target="_blank"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  dark:"
            >
              More details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
