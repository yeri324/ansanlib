import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const AutoComplete = ({ name, value, onChange, label }) => {
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`/api/book/autocomplete?query=${value}`);
      setSuggestions(response.data.slice(0, 5)); // 최대 5개의 항목만 설정
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.title || suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.title || suggestion}
    </div>
  );

  const inputProps = {
    placeholder: `Search ${label}`,
    value,
    onChange: (e, { newValue }) => onChange(e, { newValue, name })
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoComplete;
