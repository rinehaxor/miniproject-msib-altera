import React from 'react';

export default function Wave() {
  return (
    <div>
      {' '}
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#ec4999"></stop>
            <stop offset="95%" stopColor="#3b82f6"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,600 C 0,600 0,200 0,200 C 42.33039832285115,171.9207300530275 84.6607966457023,143.841460106055 135,136 C 185.3392033542977,128.158539893945 243.68721174004196,140.5548896288075 300,142 C 356.31278825995804,143.4451103711925 410.5903563941299,133.93898137871503 466,147 C 521.4096436058701,160.06101862128497 577.9513626834381,195.68918485633247 633,230 C 688.0486373165619,264.3108151436675 741.6041928721174,297.30427919595513 790,273 C 838.3958071278826,248.6957208040449 881.6318658280921,167.09369835984708 937,133 C 992.3681341719079,98.90630164015292 1059.8683438155138,112.32092736465657 1122,153 C 1184.1316561844862,193.67907263534343 1240.8947589098534,261.62259218152667 1293,274 C 1345.1052410901466,286.37740781847333 1392.5526205450733,243.18870390923666 1440,200 C 1440,200 1440,600 1440,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 300)"
        ></path>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#ec4999"></stop>
            <stop offset="95%" stopColor="#3b82f6"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,600 C 0,600 0,400 0,400 C 64.33888272290048,387.7241583425823 128.67776544580096,375.4483166851646 183,378 C 237.32223455419904,380.5516833148354 281.6278209396967,397.9308916019238 329,393 C 376.3721790603033,388.0691083980762 426.8109507954125,360.8281169071402 478,362 C 529.1890492045875,363.1718830928598 581.1283758786533,392.75664076951534 632,425 C 682.8716241213467,457.24335923048466 732.6755456899742,492.1453200147984 792,464 C 851.3244543100258,435.8546799852016 920.16944136145,344.6620791712911 982,342 C 1043.83055863855,339.3379208287089 1098.646688864225,425.206363300037 1140,449 C 1181.353311135775,472.793636699963 1209.24380318165,434.51246762856084 1257,416 C 1304.75619681835,397.48753237143916 1372.378098409175,398.74376618571955 1440,400 C 1440,400 1440,600 1440,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
          transform="rotate(-180 720 300)"
        ></path>
      </svg>
    </div>
  );
}