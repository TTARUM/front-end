'use client';
import './SearchAddress.scss';

import Image from 'next/image';
import search from '../../../public/search-mainColor.svg';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

const SearchAddress = ({ data, placeholder, setData }) => {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    const { address, zonecode } = data;
    setData(`${address} ${zonecode}`);
  };

  function searchAddress() {
    open({ onComplete: handleComplete });
  }

  return (
    <div className="search_wrapper">
      <input value={data} placeholder={placeholder} readOnly />
      <Image
        src={search}
        alt="search"
        className="searchButton"
        onClick={searchAddress}
      />
    </div>
  );
};

export default SearchAddress;
