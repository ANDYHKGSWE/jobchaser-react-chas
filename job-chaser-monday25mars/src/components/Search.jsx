import React, { useState } from 'react';

const Search = ({ setSearchTerm }) => {
	const handleChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	return (
		<div className="header-container">
			<ul>
				<input
					type="text"
					placeholder="Search for jobs..."
					onChange={handleChange}
				/>
			</ul>
		</div>
	);
};

export default Search;
