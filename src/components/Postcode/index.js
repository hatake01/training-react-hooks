import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import fetchJsonp from 'fetch-jsonp';
import { prefList } from './prefList';
import styles from './style.module.scss';

const makeOptionList = (data, index) => {
  return (
    <option key={uuid.v4()} value={data} data-index={index}>
      {data}
    </option>
  );
};

const makeSelectList = ({ list, type, handler, target }) => {
  const dom = list
    .map(listData => {
      return listData[type];
    })
    .map(makeOptionList);
  return (
    <select name={type} value={target} onChange={handler}>
      {[<option value="">-----</option>, ...dom]}
    </select>
  );
};

const makePostalList = list => {
  return list.map(data => data.postal);
};
//prefecture
//city
//town
//https://geoapi.heartrails.com/api/xml?method=getTowns&prefecture=${pref}&city=${city}

export default function Postcode({ _handler }) {
  const [pref, setPref] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [postalList, setPostalList] = useState('');
  const [postal, setPostal] = useState('');
  const prefHnadler = ev => {
    const { value } = ev.target;
    setPref(value);
  };
  const cityHnadler = ev => {
    const { value } = ev.target;
    setCity(value);
  };
  const townHnadler = ev => {
    const { target } = ev;
    const { value } = target;
    const { index } = target.querySelector(`option[value="${value}"]`).dataset;
    setTown(value);
    setPostal(postalList[index]);
  };

  // 県変更時の処理
  useEffect(() => {
    if (pref !== '') {
      const url = `https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${pref}`;
      // console.log(url);
      (async () => {
        const res = await fetchJsonp(url, {
          jsonpCallback: 'jsonp'
        }).catch(error => console.error(error));
        const tempcities = await res.json();
        // console.log(tempcities.response.location);
        setCities(tempcities.response.location);
      })();
    }
    setCity('');
    setCities([]);
    setTown('');
    setTowns([]);
  }, [pref]);
  // 市変更時の処理
  useEffect(() => {
    console.log('市変更時の処理');
    if (pref !== '' && city !== '') {
      const url = `https://geoapi.heartrails.com/api/json?method=getTowns&prefecture=${pref}&city=${city}`;
      // console.log(url);
      (async () => {
        const res = await fetchJsonp(url, {
          jsonpCallback: 'jsonp'
        }).catch(error => console.error(error));
        const tempTowns = await res.json();
        // console.log(tempTowns.response.location);
        setTowns(tempTowns.response.location);
        setPostalList(makePostalList(tempTowns.response.location));
      })();
    }
    setTown('');
    setTowns([]);
  }, [city]);
  return (
    <>
      <div className={styles.postbox}>
        <select name={'pref'} value={pref} onChange={prefHnadler}>
          <option value="">-----</option>
          {prefList}
        </select>
        {/* {makeSelectList({ handler: cityHnadler })} */}
        {makeSelectList({ list: cities, type: 'city', handler: cityHnadler, target: city })}
        {makeSelectList({ list: towns, type: 'town', handler: townHnadler, target: town })}
      </div>
      <div className={styles.displaybox} />
      <div className={styles.displaybox} />
      <div>
        {pref}
        {city}
        {town}
      </div>
      <div>{postal}</div>
    </>
  );
}
