import React, { useState, useEffect } from 'react';
import SavedJob from './SavedJob';

const SavedJobs = () => {
	const [savedJobs, setSavedJobs] = useState([]);
	console.log(savedJobs);

	useEffect(() => {
		const storedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
		setSavedJobs(storedJobs);
	}, []);

	const handleRemoveJob = (id) => {
		const updatedJobs = savedJobs.filter((job) => job.id !== id);
		setSavedJobs(updatedJobs);
		localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
	};

	return (
		<div className="jobs">
			<h1>Saved Jobs ({savedJobs.length})</h1>
			{savedJobs.map((savedJob, index) => (
				<SavedJob
					key={index}
					data={savedJob}
					onRemove={() => handleRemoveJob(savedJob.id)}
				/>
			))}
		</div>
	);
};

export default SavedJobs;
