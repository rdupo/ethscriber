import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

const Card = ({id, name}) => {
  return (
    <div
      key={id}
      className="inline-block bg-gray-800 hover:bg-pink-500 text-pink-500 hover:text-gray-800 cursor-pointer"
      onClick={() => { 
        alert(`You clicked on ${name} #${id}`);       
        }
      }
    >
      <div>
        <Image
          className="w-100"
          src={`/remix${id}.png`}
          loading="lazy"
          alt={`phunk ${id}`}
          height="200"
          width="200"
        />
      </div>
      <div className="ml-2 mb-2 text-md font-bold">
        <p>{`${name} #${id}`}</p>
      </div>
    </div>
  );
};

export default Card;
