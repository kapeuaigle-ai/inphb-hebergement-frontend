import React from 'react';
import { FaFilter, FaUndo } from 'react-icons/fa';

const FilterBar = ({ filters, onFilterChange, onReset }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-text-secondary mr-2">
                <FaFilter className="mr-2" />
                <span className="font-semibold text-sm">Filtres</span>
            </div>

            {filters.map((filter) => (
                <div key={filter.name} className="flex-1 min-w-[150px]">
                    <select
                        name={filter.name}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-preset"
                        onChange={(e) => onFilterChange(filter.name, e.target.value)}
                        value={filter.value}
                    >
                        <option value="">{filter.label}</option>
                        {filter.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <button
                onClick={onReset}
                className="flex items-center px-4 py-2 text-sm text-gray-500 hover:text-primary hover:bg-blue-50 rounded-lg transition-preset"
            >
                <FaUndo className="mr-2" /> Réinitialiser
            </button>
        </div>
    );
};

export default FilterBar;
