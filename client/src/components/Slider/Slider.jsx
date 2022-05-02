/** @format */

import Experience1 from "Images/experience/experience1.jpeg";
import Experience2 from "Images/experience/experience2.jpeg";
import Experience3 from "Images/experience/Home-Services.png";
import { Carousel } from "react-bootstrap";

export default function Slider() {
	return (
		<Carousel variant="dark" className="container">
			<Carousel.Item>
				<div className="d-flex justify-content-center">
					<img className=" w-75" src={Experience1} alt="First slide" />
				</div>
				<Carousel.Caption className="text-white">
					<h5>First slide label</h5>
					<p>Care </p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="carousel-item">
				<div className="d-flex justify-content-center">
					<img className="w-75" src={Experience2} alt="Second slide" />
				</div>
				<Carousel.Caption className="text-white">
					<h5>Second slide label</h5>
					<p>Photos of doing hair cutting</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item className="carousel-item">
				<div className="d-flex justify-content-center">
					<img className="w-75" src={Experience3} alt="Second slide" />
				</div>
				<Carousel.Caption className="text-white">
					<h5>Third slide label</h5>
					<p>
						Poster
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
