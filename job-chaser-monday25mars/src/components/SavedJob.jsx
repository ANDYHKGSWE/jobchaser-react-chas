import React, { useEffect, useState } from 'react';

const SavedJob = (props) => {
	const {
		id,
		featured,
		company,
		logo,
		position,
		contract,
		location,
		postedAt,
		languages,
		tools,
	} = props.data;

	const [icon, setIcon] = useState('');

	useEffect(() => {
		const importSvgs = async () => {
			const logoSvg = await import(`${logo}`);
			setIcon(logoSvg.default);
		};
		importSvgs();
	}, [logo]);

	const handleRemoveJob = () => {
		props.onRemove();
	};

	return (
		<>
			<div className="job-container">
				<div className="logo">
					<img src={icon} alt="Company Logo" />
				</div>

				<div className="left">
					<div className="company">
						<span className="company-name">{company}</span>
						<span className="remove-job-btn" onClick={handleRemoveJob}>
							Remove
						</span>
					</div>

					<div className="details">
						<span>{postedAt}</span>
						<span>&nbsp;•&nbsp;</span>
						<span>{contract}</span>
						<span>&nbsp;•&nbsp;</span>
						<span>{location}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default SavedJob;
