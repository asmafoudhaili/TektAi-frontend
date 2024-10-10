import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { NioSwiper, NioCard, NioButton, NioMedia } from '../../../../../components'; // Make sure NioButton and other necessary components are imported
import { jwtDecode } from 'jwt-decode';

export default function Favorite() {
  const [favoriteChallenges, setFavoriteChallenges] = useState([]);

  useEffect(() => {
    const fetchFavoriteChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await axios.get(`http://localhost:9091/user/${userId}/favoriteChallenges`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavoriteChallenges(response.data);
      } catch (error) {
        console.error('Error fetching favorite challenges:', error);
      }
    };

    fetchFavoriteChallenges();
  }, []);

  return (
    <>
      {favoriteChallenges.length === 0 ? (
        <NioCard className="text-center " style={{ width: '50%', margin: 'auto' }}>
          <NioCard.Body>
            <h6 className="text-capitalize display-6 mb-2">
              Ready to <span className="text-indigo">Level Up?</span> Choose Your <span className="text-red-400">Favorite</span> Challenge and Unlock  <span className="text-indigo">Personalized Recommendations!</span>
            </h6>
            <ul className="nk-btn-group justify-content-center pt-5">
              <li>
                <NioButton href="/AllChallenges" className="btn-red" label="See All " />
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
          {favoriteChallenges.map(challenge => (
            <SwiperSlide className="pt-7 pt-md-0 h-auto" key={challenge._id}>
              <div className="nk-testimonial-wrap nk-testimonial-wrap-s2 ">
                <div className="nk-testimonial-card nk-testimonial-card-s2 bg-white text-center">
                  <div className="nk-testimonial-content">
                    <div className="card-content pt-4">
                      <div className="card-image">
                        <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                      </div>
                      <h2 className="text-center text-capitalize  m-0">
                        <Link
                          className="text-dark"
                          to={`/ChallengeDetails/${challenge._id}`}
                        >
                          {challenge.title}
                        </Link>
                      </h2>

                      <div className="media-text">
                        <span className="lead-text fw-normal">
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
                    <hr className="my-4" style={{ margin: 'auto' }} />
                    <div className="tex-start">
                      <Rating name="size-large" defaultValue={2} size="large" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </NioSwiper>
      )}
    </>
  );
}
