import React, { useEffect, useState } from 'react';
import Job from './Job';
import Loading from './Loading';

const Jobs = ({ data, setKeywords, keywords, searchTerm }) => {
	console.log(data);

	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const SearchFunction = () => {
		if (searchTerm.length > 0 && keywords.length === 0) {
			const newData = filteredData.filter((data) => {
				return data.position.toLocaleLowerCase().includes(searchTerm);
			});
			const sortedData = sortData(newData);
			setFilteredData(sortedData);
			console.log('NEWDATA: ', newData);
		} else {
			console.log('ORIGINAL DATA: ', data);
			TagFunction();
		}
	};

	const TagFunction = () => {
		if (keywords) {
			const newData = data.filter((data) => {
				return keywords.every((key) => {
					return (
						data.role === key ||
						data.level === key ||
						data.languages.includes(key) ||
						data.tools.includes(key)
					);
				});
			});
			const sortedData = sortData(newData);
			setFilteredData(sortedData);
		} else {
			SearchFunction();
		}
	};

	useEffect(() => {
		TagFunction();
		SearchFunction();
	}, [keywords, searchTerm]);

	const sortData = (data) => {
		return [...data].sort((a, b) => {
			if (a.featured === b.featured) {
				return b.new - a.new;
			}
			return a.featured ? -1 : 1;
		});
	};

	useEffect(() => {
		const sortedData = sortData(data);
		setFilteredData(sortedData);
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, [data]);

	return isLoading ? (
		<Loading />
	) : (
		<div className="jobs">
			{filteredData.map((data) => {
				return <Job key={data.id} data={data} setkeywords={setKeywords} />;
			})}
		</div>
	);
};

export default Jobs;
