import React, { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar.js';

export default function ThingsToCarry({ carryLists, storageKey }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [isStorageReady, setIsStorageReady] = useState(false);

  const visibleItems = useMemo(() => {
    if (!carryLists) return [];

    return Object.entries(carryLists).flatMap(([category, values]) =>
      (values || []).slice(0, 3).map((item, index) => ({
        id: `${category}-${index}-${item}`,
        category,
        item,
      }))
    );
  }, [carryLists]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsStorageReady(false);

    if (!storageKey) {
      setCheckedItems({});
      setIsStorageReady(true);
      return;
    }

    try {
      const storedItems = window.localStorage.getItem(storageKey);
      setCheckedItems(storedItems ? JSON.parse(storedItems) : {});
    } catch (error) {
      console.error('Failed to load packing checklist state.', error);
      setCheckedItems({});
    }

    setIsStorageReady(true);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined' || !storageKey || !isStorageReady) return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch (error) {
      console.error('Failed to save packing checklist state.', error);
    }
  }, [checkedItems, isStorageReady, storageKey]);

  useEffect(() => {
    if (!visibleItems.length) return;

    const visibleIds = new Set(visibleItems.map(({ id }) => id));
    setCheckedItems((current) => {
      const nextCheckedItems = Object.fromEntries(
        Object.entries(current).filter(([id]) => visibleIds.has(id))
      );

      return Object.keys(nextCheckedItems).length === Object.keys(current).length
        ? current
        : nextCheckedItems;
    });
  }, [visibleItems]);

  const completedCount = visibleItems.filter(({ id }) => checkedItems[id]).length;

  if (!carryLists) return null;

  const handleToggle = (id) => {
    setCheckedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="card border-0 bg-light p-3">
      <h6 className="fw-bold mb-3"><i className="bi bi-backpack2-fill text-primary me-2"></i>Packing Checklist</h6>
      <ProgressBar current={completedCount} total={visibleItems.length} label="Packing Progress" />
      {Object.entries(carryLists).map(([category, items]) => (
        <div key={category} className="mb-2">
          <div className="text-uppercase font-bold text-dark text-xs small fw-bold text-muted">{category}</div>
          <ul className="list-unstyled ps-1 mb-2">
            {items?.slice(0, 3).map((item, idx) => (
              <li key={idx} className="small text-secondary text-truncate">
                <input
                  type="checkbox"
                  className="me-2"
                  id={`check-${category}-${idx}`}
                  checked={!!checkedItems[`${category}-${idx}-${item}`]}
                  onChange={() => handleToggle(`${category}-${idx}-${item}`)}
                />
                <label className="form-check-label" htmlFor={`check-${category}-${idx}`}>
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}