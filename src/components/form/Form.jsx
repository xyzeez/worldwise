import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

// Hooks
import useUrlPosition from '../../hooks/useUrlPosition';

// Contexts
import { useCities } from '../../contexts/CitiesContext';

// Components
import Button from '../button/Button';
import Message from '../message/Message';
import Spinner from '../spinner/Spinner';

const convertToEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

// Variables
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState(null);
  const { createCity } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;

    const fetchCityData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (!data.countryCode) throw new Error("This isn't a city");

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    setIsLoading(true);

    await createCity(newCity);

    setIsLoading(false);

    navigate('/app/cities');
  };

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          value={date}
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          clickHandler={(e) => {
            e.preventDefault();
            navigate('/app/cities');
          }}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
