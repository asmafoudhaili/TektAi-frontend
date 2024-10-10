import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { NioSwiper, NioMedia, NioCard, NioButton } from '../../../../../components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { jwtDecode } from 'jwt-decode';

export default function MyChallenge() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [userId, setUserId] = useState(null); // State to store user ID

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token); // Decode JWT token to get user ID
        const userId = decodedToken._id;
        setUserId(userId); // Set the user ID state variable
        const response = await axios.get(`http://localhost:9091/user/${userId}/challenges`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []); // Make sure to pass an empty dependency array to useEffect to ensure it runs only once on component mount

  const redirectToChallengeDetails = (challengeId) => {
    navigate(`/ChallengeDetails/${challengeId}`);
  };

  return (
    <div>
      {challenges.length === 0 ? (
        <NioCard className="text-center" style={{ width: '50%', margin: 'auto' }}>
          <NioCard.Body>
            <h6 className="text-capitalize display-6 mb-2">
              What are you waiting for? <span className="text-indigo">Yalla!</span> Start creating your challenge.
            </h6>
            <ul className="nk-btn-group justify-content-center pt-5">
              <li>
                <NioButton href="/Competion-form" className="btn-yellow" label="Create" />
              </li>
            </ul>
          </NioCard.Body>
        </NioCard>
      ) : (
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
              <div className="nk-testimonial-wrap nk-testimonial-wrap-s2">
                <div className="nk-testimonial-card nk-testimonial-card-s2 bg-white text-center">
                  <div className="nk-testimonial-content">
                    <div className="card-content pt-4">
                      <div className="card-image">
                        <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                      </div>
                      <h2 className="text-center text-capitalize m-0">
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
                            <strong>Start Date:</strong> {new Date(challenge.startDate).toLocaleDateString('fr-FR')}
                          </p>
                          <p>
                            <strong>End Date:</strong> {new Date(challenge.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        </span>
                      </div>
                    </div>
                    <hr className="my-4" style={{ margin: 'auto' }} /> {/* Centering the <hr/> */}
                    <div className="text-start">
                      <Rating name="size-large" defaultValue={2} size="large" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </NioSwiper>
      )}
    </div>
  );
}
