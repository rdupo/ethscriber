import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

const Card = ({ price, atts, id, coll }) => {
  let alt_id;
  let s_id = id.toString();

  if (s_id.length === 1) {
    alt_id = "000" + s_id;
  } else if (s_id.length === 2) {
    alt_id = "00" + s_id;
  } else if (s_id.length === 3) {
    alt_id = "0" + s_id;
  } else {
    alt_id = s_id;
  }

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Define variables for dynamic values
  let imageSrc, imageClassName, idClassName, collSrc;

  // Set values based on hover state and coll value
  if (isHovered && coll === 'philip') {
    // philip hover state
    imageSrc = `/phunks/phunk${alt_id}.svg`;
    imageClassName = 'img-wrapper v1-bg';
    idClassName = 'phunk-id mb-0 v1-txt';
    collSrc = 'philip';
  } else if (!isHovered && coll === 'philip') {
  	// philip default state
	  imageSrc = '/phunks/philip.png';
    imageClassName = 'img-wrapper philip-bg';
    idClassName = 'phunk-id mb-0 philip-txt';
    collSrc = 'philip';
  } else if (coll === 'v2' || coll === 'auc') {
    imageSrc = `/phunks/phunk${alt_id}.svg`;
    imageClassName = 'img-wrapper v2-bg';
    idClassName = 'phunk-id mb-0 v2-txt';
    collSrc = 'cryptophunk';
  } else if (coll === 'v1' && id >= 0) {
    // wrapped v1 state
    imageSrc = `/phunks/phunk${alt_id}.svg`;
    imageClassName = 'img-wrapper v1-bg';
    idClassName = 'phunk-id mb-0 v1-txt';
    collSrc = 'wrapped-v1-phunk';
  } else if (coll === 'v1' && id === -1) {
    // default v1 image state
    imageSrc = `/phunks/phunk${alt_id}.svg`;
    imageClassName = 'img-wrapper philip-bg';
    idClassName = 'phunk-id mb-0 philip-txt';
    collSrc = 'philip';
  } else {
    // Values for v3 phunks; default
    imageSrc = `/phunks/phunk${alt_id}.svg`;
    imageClassName = 'img-wrapper v3-bg';
    idClassName = 'phunk-id mb-0 v3-txt';
    collSrc = 'v3phunk'
  }

  return (
    <div
      key={id}
      className="brite black-bg white-txt inline-block sans-underline"
      data-price={price}
      data-atts={atts}
      onClick={() => { 
          if(coll === 'auc'){
            window.open('https://phunks.auction/', '_blank');
          } else {
            Router.push({ pathname: `/${collSrc}/${id}` });
          }        
        }
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={imageClassName}>
        <Image
          className="w-100"
          src={id === -1 ? '/phunks/philip.png' : imageSrc}
          loading="lazy"
          alt={`phunk ${id}`}
          height="100"
          width="100"
        />
      </div>
      <div className="card-info-wrapper ml-2">
        <p className={idClassName}>#{id >= 0 ? id : '---'}</p>
        <h4 className="phunk-price mb-1">{price}</h4>
      </div>
    </div>
  );
};

export default Card;
