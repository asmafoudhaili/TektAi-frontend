import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useParams, useNavigate, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { NioSection, NioSwiper,NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../../../../components'
// data 
import { useData } from "../../../../../context/DataProvider/DataProvider";

export default function Browsechallenge() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const data = useData();
  const contents = data.testimonials.kids.contents;
  const redirectToChallengeDetails = (challengeId) => {
    navigate(`/ChallengeDetails/${challengeId}`);
  };

  useEffect(() => {
    // Fetch last three challenges from the backend
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9091/challenge', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Challenges:', response.data);
        setChallenges(response.data.slice(-3));} // Get the last three challenges
         catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <NioSwiper
      className="nk-swiper-s1"
      gap={30}
      navigation
      loop={true}
      duration={1600}
      autoplay={false}
      centeredSlides={true}
      wrapperClass="align-items-center pt-4"
      navClass="swiper-button-group-s1 text-purple justify-content-center"
      breakpoints={{
        "0": { "slidesPerView": 1 },
        "992": { "slidesPerView": 2 },
        "1200": { "slidesPerView": 3 }
      }}
    >
      {challenges.map((challenge, idx) => (
        <SwiperSlide className="pt-7 pt-md-0 h-auto" key={idx}>
          <div className="nk-testimonial-wrap nk-testimonial-wrap-s2 ">
            <div className="nk-testimonial-card nk-testimonial-card-s2 bg-white text-center">
              <div className="nk-testimonial-content">
                         <div className="card-content pt-4">
                         <div className="card-image">
                            <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                          </div>
                            <h2 className="text-center text-capitalize  m-0"> {/* Centering the title */}
                              <Link
                                className="text-dark"
                                to={`/ChallengeDetails/${challenge._id}`}
                                onClick={() => redirectToChallengeDetails(challenge._id)}
                              >
                                {challenge.title}
                              </Link>
                            </h2>
                              
                              <div className="media-text">
                                <span className="lead-text fw-normal">
                                <NioMedia size="md" rounded img="images/avatar/a.jpg" />
                                  <p>
                                    <strong>Created By:</strong> {challenge.createdByFirstName}
                                  </p>
                                  <p>
                                    <strong>Prize:</strong> {challenge.prize}
                                  </p>
                                  <p>
                                    <strong>Start Date:</strong>{new Date(challenge.startDate).toLocaleDateString('fr-FR')}
                                  </p>
                                  <p>
                                    <strong>End Date:</strong>{new Date(challenge.endDate).toLocaleDateString('fr-FR')}
                                  </p>
                                </span>
                               
                              </div>
                            </div>
                            <hr className="my-4" style={{margin: 'auto'}}/> {/* Centering the <hr/> */}
                            <div className="tex-start">
                              <Rating name="size-large" defaultValue={2} size="large" />
                            </div>
                          </div>
              </div>
            </div>
        </SwiperSlide>
      ))}
    </NioSwiper>
  )
}
