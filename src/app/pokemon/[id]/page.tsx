import Link from "next/link";
import React from "react";

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  );

  const data = await response.json();

  const name = data.names.find(
    (name: { language: { name: string } }) => name.language.name === "ko",
  ).name;
  const flavorText = data.flavor_text_entries.find(
    (text: { flavor_text: string; language: { name: string } }) =>
      text.language.name === "ko",
  ).flavor_text;

  const statsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const statsData = await statsResponse.json();

  return (
    <div className="flex flex-col flex-1 items-center p-1 bg-gradient-to-b from-red-500">
      <div className="flex items-center justify-end gap-2 w-full p-5">
        <div className="flex flex-1 items-center gap-2">
          <Link href="/pokemon">
            <BackIcon />
          </Link>
          <p className="flex flex-1 text-2xl text-bold text-white">{name}</p>
        </div>
        <div className="flex text-bold text-white">#{id.padStart(3, "0")}</div>
      </div>

      <img
        src={statsData.sprites.other["official-artwork"].front_default}
        alt="name"
        className="w-[200px] h-[200px]"
      />
      <section className="flex flex-1 flex-col gap-4 items-center p-5 w-full bg-white rounded-lg">
        <div className="flex gap-4">
          {statsData.types.map(
            (data: { slot: number; type: { name: string; url: string } }) => (
              <div className="flex justify-center items-center px-2 py-px font-bold text-white text-sm rounded-xl bg-gray-400">
                {data.type.name}
              </div>
            ),
          )}
        </div>
        <strong className="font-bold">정보</strong>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-1 flex-col items-center border-r">
            <span className="py-2">
              {(statsData.weight * 0.1).toFixed(2)} kg
            </span>
            <span className="text-gray-500 text-sm">무게</span>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <span className="py-2">
              {(statsData.height * 0.1).toFixed(2)} m
            </span>
            <span className="text-gray-500 text-sm">높이</span>
          </div>
          <div className="flex flex-1 flex-col items-center border-l">
            <span className="py-2">-</span>
            <span className="text-gray-500 text-sm">스킬</span>
          </div>
        </div>

        <div className="py-4">{flavorText}</div>

        <strong className="font-bold">기본 능력</strong>
        <div className="flex flex-col w-full">
          {statsData.stats.map(
            (e: { stat: { name: string }; base_stat: number }, idx: number) => (
              <div key={idx} className="flex flex-1 px-5">
                <span className="w-36 text-right">{e.stat.name}</span>
                <span className="mx-5">
                  {String(e.base_stat).padStart(3, "0")}
                </span>
                <div className="flex flex-1 items-center relative">
                  <div className="absolute h-1 inset-x-0 bg-gray-100" />
                  <div
                    className="absolute h-1 bg-gray-900"
                    style={{ width: `${e.base_stat}px` }}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

const BackIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <g filter="url(#filter0_d_1149_107)">
        <path
          d="M14.8999 25.9666L5.63325 16.6999C5.52214 16.5888 5.44436 16.4777 5.39992 16.3666C5.35547 16.2555 5.33325 16.1333 5.33325 15.9999C5.33325 15.8666 5.35547 15.7444 5.39992 15.6333C5.44436 15.5222 5.52214 15.4111 5.63325 15.2999L14.9333 5.99994C15.111 5.82216 15.3333 5.73328 15.5999 5.73328C15.8666 5.73328 16.0999 5.83328 16.2999 6.03328C16.4999 6.23328 16.5999 6.46661 16.5999 6.73328C16.5999 6.99994 16.4999 7.23328 16.2999 7.43328L8.73325 14.9999H25.2666C25.5555 14.9999 25.7944 15.0944 25.9833 15.2833C26.1721 15.4722 26.2666 15.7111 26.2666 15.9999C26.2666 16.2888 26.1721 16.5277 25.9833 16.7166C25.7944 16.9055 25.5555 16.9999 25.2666 16.9999H8.73325L16.3333 24.5999C16.511 24.7777 16.5999 24.9999 16.5999 25.2666C16.5999 25.5333 16.4999 25.7666 16.2999 25.9666C16.0999 26.1666 15.8666 26.2666 15.5999 26.2666C15.3333 26.2666 15.0999 26.1666 14.8999 25.9666Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1149_107"
          x="1.33325"
          y="2.73328"
          width="28.9333"
          height="28.5333"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_1149_107"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1149_107"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1149_107"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
