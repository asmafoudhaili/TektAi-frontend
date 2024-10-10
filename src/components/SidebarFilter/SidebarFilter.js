import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { NioSection, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../components';

const SidebarFilter = ({ onFilter }) => {
  const [filterOptions, setFilterOptions] = useState({
    date: 'newest',
    price: 'monetary',
    participation: 'everyone'
  });

  const handleFilterChange = (category, value) => {
    setFilterOptions({ ...filterOptions, [category]: value });
    // Call the onFilter callback with the updated filter options
    onFilter(filterOptions);
  };

  return (
    <NioCard>
      <NioCard.Body>
        <div>
          {/* Date filter */}
          <div className="filter-section">
            <h6 className="filter-title">Date</h6>
            <div className="filter-options">
              <div className="checkbox-option">
                <Checkbox
                  id="newest"
                  checked={filterOptions.date === 'newest'}
                  onChange={() => handleFilterChange('date', 'newest')}
                  color="secondary"
                />
                <label htmlFor="newest" style={{ marginTop: '8px', marginBottom: '8px' }}>Newest</label>
              </div>
              <div className="checkbox-option">
                <Checkbox
                  id="oldest"
                  checked={filterOptions.date === 'oldest'}
                  onChange={() => handleFilterChange('date', 'oldest')}
                  color="secondary"
                />
                <label htmlFor="oldest" style={{ marginTop: '8px', marginBottom: '8px' }}>Oldest</label>
              </div>
            </div>
          </div>

          {/* Price filter */}
          <div className="filter-section">
            <h6 className="filter-title">Price</h6>
            <div className="filter-options">
              <div className="checkbox-option">
                <Checkbox
                  id="monetary"
                  checked={filterOptions.price === 'monetary'}
                  onChange={() => handleFilterChange('price', 'monetary')}
                  color="secondary"
                />
                <label htmlFor="monetary" style={{ marginTop: '8px', marginBottom: '8px' }}>Monetary</label>
              </div>
              <div className="checkbox-option">
                <Checkbox
                  id="non-monetary"
                  checked={filterOptions.price === 'non-monetary'}
                  onChange={() => handleFilterChange('price', 'non-monetary')}
                  color="secondary"
                />
                <label htmlFor="non-monetary" style={{ marginTop: '8px', marginBottom: '8px' }}>Non-Monetary</label>
              </div>
            </div>
          </div>

          {/* Participation filter */}
          <div className="filter-section">
            <h6 className="filter-title">Participation</h6>
            <div className="filter-options">
              <div className="checkbox-option">
                <Checkbox
                  id="everyone"
                  checked={filterOptions.participation === 'everyone'}
                  onChange={() => handleFilterChange('participation', 'everyone')}
                  color="secondary"
                />
                <label htmlFor="everyone" style={{ marginTop: '8px', marginBottom: '8px' }}>For Everyone</label>
              </div>
              <div className="checkbox-option">
                <Checkbox
                  id="invitation-only"
                  checked={filterOptions.participation === 'invitation-only'}
                  onChange={() => handleFilterChange('participation', 'invitation-only')}
                  color="secondary"
                />
                <label htmlFor="invitation-only" style={{ marginTop: '8px', marginBottom: '8px' }}>Invitation Only</label>
              </div>
            </div>
          </div>
        </div>
      </NioCard.Body>
    </NioCard>
  );
};

export default SidebarFilter;
