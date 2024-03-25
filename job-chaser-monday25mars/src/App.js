import React, { useState, useEffect } from 'react';
import Jobs from './components/Jobs';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';

function App() {
	const [data, setData] = useState([]);
	const [filterkeyWords, setfilterKeywords] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('../data.json');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.log('Error fetching data: ', error);
			}
		};

		fetchData();
	}, []);

	const addFilterKeywords = (data) => {
		if (!filterkeyWords.includes(data)) {
			setfilterKeywords([...filterkeyWords, data]);
		}
	};

	const deleteKeyword = (data) => {
		const newKeywords = filterkeyWords.filter((key) => key !== data);
		setfilterKeywords(newKeywords);
	};

	const clearAll = () => {
		setfilterKeywords([]);
	};

	return (
		<>
			<div className="header">
				<h1>JobChaser</h1>
			</div>

			<Search setSearchTerm={setSearchTerm} />

			{filterkeyWords.length > 0 && (
				<Header
					keywords={filterkeyWords}
					removeKeywords={deleteKeyword}
					clearAll={clearAll}
				/>
			)}

			<Jobs
				keywords={filterkeyWords}
				data={data}
				setKeywords={addFilterKeywords}
				searchTerm={searchTerm}
			/>
		</>
	);
}

export default App;
