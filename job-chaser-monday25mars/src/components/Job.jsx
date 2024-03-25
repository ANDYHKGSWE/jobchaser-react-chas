import React, { useEffect, useState } from 'react';

const Job = (props) => {
	const {
		id,
		featured,
		company,
		logo,
		position,
		role,
		level,
		contract,
		location,
		postedAt,
		languages,
		tools,
	} = props.data;

	let keywords = [role, level, ...languages, ...tools];

	const [icon, setIcon] = useState('');
	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		const importSvgs = async () => {
			const logoSvg = await import(`${logo}`);
			setIcon(logoSvg.default);
		};
		let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
		const isJobSaved = savedJobs.some((savedJob) => savedJob.id === id);
		setIsSaved(isJobSaved);
		importSvgs();
	}, [logo, id]);

	const handleSaveJob = () => {
		const jobObject = {
			id,
			featured,
			company,
			logo,
			position,
			role,
			level,
			contract,
			location,
			postedAt,
			languages,
			tools,
		};

		let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

		const isJobSaved = savedJobs.some((savedJob) => savedJob.id === id);

		if (!isJobSaved) {
			savedJobs.push(jobObject);
			localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
			setIsSaved(true);
			console.log('Job saved!');
		} else {
			savedJobs = savedJobs.filter((savedJob) => savedJob.id !== id);
			localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
			setIsSaved(false);
			console.log('Job not saved anymore!');
		}
	};

	return (
		<div
			className={
				featured ? 'job-container job-container-borderLeft' : 'job-container'
			}
		>
			<div className="logo">
				<img src={icon} alt="" />
			</div>

			<div className="left">
				<div className="company">
					<span className="company-name">{company}</span>
					{props.data.new && <span className="new">new!</span>}
					{props.data.featured && <span className="featured">featured</span>}
					<span className="save-job-btn" onClick={handleSaveJob}>
						{isSaved ? 'Saved' : 'Save'}
					</span>
				</div>

				<div className="position">{position}</div>

				<div className="details">
					<span>{postedAt}</span>
					<span>&nbsp;•&nbsp;</span>
					<span>{contract}</span>
					<span>&nbsp;•&nbsp;</span>
					<span>{location}</span>
				</div>
			</div>

			<div className="right">
				{keywords.map((key, id) => (
					<span onClick={() => props.setkeywords(key)} key={id}>
						{key}
					</span>
				))}
			</div>
		</div>
	);
};
export default Job;
