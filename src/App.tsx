import { ChangeEvent, useEffect, useState } from "react";
import { useLocationsStore } from "./store/useLocationsStore";
import { Input } from "./components/Input/Input";
import { QuestionIcon } from "./components/icons/QuestionIcon";

import s from "./App.module.css";
import {
  LocationItem,
  TestLocationSelects,
} from "./components/TestLocationSelects/TestLocationSelects";
import { TrashIcon } from "./components/icons/TrashIcon";

export default function App() {
  return (
    <div className={s.app}>
      <TestLocationsList />
    </div>
  );
}

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<LocationItem[]>([
    { hint: "", id: Date.now() },
  ]);

  const setLocation = (index: number) => (newLocation: LocationItem) => {
    setLocationsList((prev) =>
      prev.map((prevLocation, i) => (i === index ? newLocation : prevLocation)),
    );
  };

  const addLocation = () => {
    setLocationsList((locationsList) => [
      ...locationsList,
      { hint: "", id: Date.now() },
    ]);
  };

  const deleteLocation = (id: number) => () => {
    setLocationsList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {locationsList.map((location, index) => (
        <TestLocationForm
          key={`location-${index}`}
          index={index}
          location={location}
          setLocation={setLocation(index)}
          deleteLocation={deleteLocation(location.id)}
        />
      ))}
      <button type="button" onClick={addLocation}>
        Добавить тестовую локацию
      </button>
      <button
        onClick={() => {
          console.log(
            locationsList.map(({ hint, environmentID, locationID }) => ({
              environmentID,
              locationID,
              hint,
            })),
          );
        }}
      >
        Вывести результат в консоль
      </button>
    </>
  );
};

interface TestLocationFormProps {
  index: number;
  setLocation: (location: LocationItem) => void;
  location: LocationItem;
  deleteLocation: () => void;
}

const TestLocationForm = (props: TestLocationFormProps) => {
  const { index, setLocation, location, deleteLocation } = props;

  const { isLoaded, fetch, ...store } = useLocationsStore();

  const onChangeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = store.locations.find(
      ({ locationID }) => +e.target.value === locationID,
    );
    if (value)
      setLocation({
        ...location,
        locationID: value.locationID,
      });
  };
  const onChangeEnvironment = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = store.environments.find(
      ({ environmentID }) => +e.target.value === environmentID,
    );
    if (value)
      setLocation({
        ...location,
        environmentID: value.environmentID,
      });
  };

  useEffect(() => {
    if (!isLoaded) {
      fetch();
    } else {
      setLocation({
        ...location,
        locationID: store.locations[0].locationID,
        environmentID: store.environments[0].environmentID,
      });
    }
  }, [isLoaded, fetch]);

  if (!isLoaded) {
    return <div>Данные не загружены</div>;
  }

  return (
    <div className={s.location}>
      <div className={s.header}>
        <h3>Тестовая локация {index + 1}</h3>
        <button type="button" onClick={deleteLocation}>
          <TrashIcon />
        </button>
      </div>
      <TestLocationSelects
        location={location}
        onChangeEnvironment={onChangeEnvironment}
        onChangeLocation={onChangeLocation}
        store={store}
      />
      <Input
        label="Подсказка"
        placeholder="Комментарий по локации"
        icon={<QuestionIcon />}
        type="text"
        value={location.hint}
        onChange={(e) => setLocation({ ...location, hint: e.target.value })}
      />
    </div>
  );
};
