import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { makeUrl } from "../../redux/actions/functions";
import { connect } from "react-redux";
function ClassesList(props) {

	const [isActive, setActive] = useState("false");
	const handleToggle = () => {
		setActive(!isActive);
	};

	const [isOn, setOn] = useState("false");
	const calendarToggle = () => {
		setOn(!isOn);
	};



	return (
		<>
			<h2 className={"portfolio-navs-header"}>Our Great Classes</h2>
			<div className={"portfolio-navs text-center"}>
				<span
					className={`d-inline-block portfolio-nav ${props.level === "" ? "active" : ""
						}`}
					onClick={() => {
						props.changeLevel("");
						props.searchClasses("");
					}}
				>
					All Levels
				</span>
				{props.levels.map((level, index) => {
					return (
						<span
							className={`d-inline-block portfolio-nav ${props.level === level ? "active" : ""
								}`}
							key={`portfolio-level-${index}`}
							onClick={() => {
								props.changeLevel(level);
								props.searchClasses(level);
							}}
						>
							{level}
						</span>
					);
				})}
			</div>
			{!props.classes.length == 0 ? (
				<div className="toggle-list">
					<button className={`toggle-list-btn ${!isActive ? 'active' : ''}`} onClick={handleToggle}>
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M4 17q-.425 0-.712-.288Q3 16.425 3 16t.288-.713Q3.575 15 4 15t.713.287Q5 15.575 5 16t-.287.712Q4.425 17 4 17Zm0-4q-.425 0-.712-.288Q3 12.425 3 12t.288-.713Q3.575 11 4 11t.713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm0-4q-.425 0-.712-.288Q3 8.425 3 8t.288-.713Q3.575 7 4 7t.713.287Q5 7.575 5 8t-.287.712Q4.425 9 4 9Zm3 8v-2h14v2Zm0-4v-2h14v2Zm0-4V7h14v2Z" /></svg>
					</button>
					<button className={`toggle-list-btn ${!isOn ? 'active' : ''}`} onClick={calendarToggle}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Zm7 6q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18Z"/></svg>
					</button>
				</div>
			) : null}

			<div className={`classes-list row ${!isActive ? 'list' : ''}`} >

				{props.classes.map((classItem, index) => {
					const linkParam = classItem.product.slug || classItem.id;




					return (

						
						<NavLink
							to={makeUrl(
								`/class-detail/${linkParam}`,
								props.match.params.invite
							)}
							className={"classes-item col-lg-4 col-md-6"}
							key={`classesItem_${index}`}
						>
							<div className={"classes-item-container"}>
								<div
									className={"image-container"}
									style={{
										backgroundImage: `url(${props.settings.mainUrl +
											`/storage/${classItem.product.image_url}`
											})`,
									}}
								>
									{(classItem.product.numbers_of_seats >
										classItem.product.buyed_numbers_of_seats) ? ''
										: <span className="sold-out">Sold out</span>}
								</div>
								<div className={"text-container"}>

									<div className={"meta-block "}>
										<span className={"btn btn-pink class-level d-inline-block"}>
											{classItem.product.level}
										</span>
										<span className={"btn btn-light class-level d-inline-block class-price"}>
											£{classItem.product.price}
										</span>
										<div className="row">
											<div className={"col-6 date-container"}>
												<span className={"icon"}>
													<i className="far fa-calendar-alt"></i>
												</span>
												<span className={"text"}>
													{classItem.product.lesson_date}
												</span>
											</div>
											<div className={"col-6 location-container"}>
												<span className={"icon"}>
													<i className="fas fa-map-marker-alt"></i>
												</span>
												<span className={"text"}>
													{classItem.product.venue.name}
												</span>
											</div>
										</div>

									</div>
									<div className={"class-title"}>{classItem.product.name}</div>
									<div className="class-text">
										{(classItem.product.class_details || '').replace(/(<([^>]+)>)/gi, "").substr(0, 150)}
									</div>
								</div>
							</div>
						</NavLink>
					);
				})}
			</div>
			<div className={"text-center "}>
				{props.isLoadMore ? (
					<button
						className={"btn btn-pink btn-lg"}
						onClick={() => {
							props.nextPage();
						}}
					>
						Load more
					</button>
				) : null}
			</div>
			
		</>
	);
}
function mapStateToProps(state) {
	return {
		settings: state.settings,
	};
}
export default connect(mapStateToProps)(withRouter(ClassesList));
