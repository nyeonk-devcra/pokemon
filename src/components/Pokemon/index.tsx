"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataType {
  id: number;
  name: string;
  imgUrl: string;
}
/*
{
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "image": {
        "png": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "svg": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    },
    "stats": [
        {
            "name": "hp",
            "baseStat": 45
        },
        {
            "name": "attack",
            "baseStat": 49
        },
        {
            "name": "defense",
            "baseStat": 49
        },
        {
            "name": "special-attack",
            "baseStat": 65
        },
        {
            "name": "special-defense",
            "baseStat": 65
        },
        {
            "name": "speed",
            "baseStat": 45
        }
    ],
    "types": [
        {
            "slot": 1,
            "name": "grass",
            "typeId": "12"
        },
        {
            "slot": 2,
            "name": "poison",
            "typeId": "4"
        }
    ],
    "moves": [
        "razor-wind",
        "swords-dance"
    ]
},*/

const Pokemon = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    );
    await response
      .json()
      .then((data) =>
        data.results.map((pokemon: { name: string; url: string }) =>
          fetchImgData(pokemon.name),
        ),
      );
  };

  // todo :: 함수명 변경
  const fetchImgData = async (name: string) => {
    // get image src
    const imgResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const imgUrl = await imgResponse
      .json()
      .then((data) => data.sprites.other["official-artwork"].front_default);

    // get ko name, id
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    );
    const data = await response.json();

    const nameKo = data.names.find(
      (name: { language: { name: string } }) => name.language.name === "ko",
    ).name;

    setData((prev) => prev.concat({ id: data.id, name: nameKo, imgUrl }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = () =>
    searchQuery
      ? data.filter((pokemon) => pokemon.name.includes(searchQuery))
      : data;

  return (
    <div className="flex flex-col flex-1 min-h-fit bg-red-500 p-2">
      <div className="p-3 flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <Image
            src={`/pokeball.svg`}
            alt="로고 아이콘"
            width={32}
            height={32}
          />
          <Image src={`/pokedex.svg`} alt="로고" width={150} height={32} />
        </div>

        <div className="flex flex-1 gap-4 mb-3 items-center">
          <div className="py-2 px-4 rounded-2xl bg-white flex flex-1 items-center gap-2">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsDropdown((prev) => !prev)}
            className="flex items-center justify-center w-8 h-8 p-2 text-red-500 bg-white rounded-full relative"
          >
            #
            {isDropdown && (
              <div className="absolute top-16 right-px bg-red-500 rounded-xl p-1">
                <p className="py-4 px-5 text-white font-bold text-sm">
                  Sort by:
                </p>
                <div className="flex flex-col bg-white rounded-lg">
                  <div className="px-5 py-2 hover:bg-gray-50 text-black rounded-lg">
                    Number
                  </div>
                  <div className="px-5 py-2 hover:bg-gray-50 text-black rounded-lg">
                    Name
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 rounded-lg bg-white py-6 px-3">
        <div className="flex flex-wrap gap-2 justify-center content-start">
          {filteredData().map((item: DataType, idx: number) => (
            <Link
              key={idx}
              href={`/pokemon/${item.id}`}
              className="flex flex-col items-center justify-center h-fit w-[104px] gap-2 border rounded-lg shadow hover:bg-gray-50"
            >
              <p className="flex w-full p-2 pb-0 justify-end text-[8px] text-gray-400">
                #{String(item.id).padStart(3, "0")}
              </p>
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-[72px] h-[72px]"
              />
              <p className="text-xs p-2 pt-0">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.9 13.6167L8.88333 9.6C8.55 9.88889 8.16111 10.1139 7.71667 10.275C7.27222 10.4361 6.8 10.5167 6.3 10.5167C5.1 10.5167 4.08333 10.1 3.25 9.26667C2.41667 8.43334 2 7.42778 2 6.25C2 5.07223 2.41667 4.06667 3.25 3.23334C4.08333 2.4 5.09444 1.98334 6.28333 1.98334C7.46111 1.98334 8.46389 2.4 9.29167 3.23334C10.1194 4.06667 10.5333 5.07223 10.5333 6.25C10.5333 6.72778 10.4556 7.18889 10.3 7.63334C10.1444 8.07778 9.91111 8.49445 9.6 8.88334L13.65 12.9C13.75 12.9889 13.8 13.1028 13.8 13.2417C13.8 13.3806 13.7444 13.5056 13.6333 13.6167C13.5333 13.7167 13.4111 13.7667 13.2667 13.7667C13.1222 13.7667 13 13.7167 12.9 13.6167ZM6.28333 9.51667C7.18333 9.51667 7.95 9.19723 8.58333 8.55834C9.21667 7.91945 9.53333 7.15 9.53333 6.25C9.53333 5.35 9.21667 4.58056 8.58333 3.94167C7.95 3.30278 7.18333 2.98334 6.28333 2.98334C5.37222 2.98334 4.59722 3.30278 3.95833 3.94167C3.31944 4.58056 3 5.35 3 6.25C3 7.15 3.31944 7.91945 3.95833 8.55834C4.59722 9.19723 5.37222 9.51667 6.28333 9.51667Z"
        fill="#DC0A2D"
      />
    </svg>
  );
};
