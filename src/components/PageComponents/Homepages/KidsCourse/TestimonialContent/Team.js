import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { NioSection, NioSwiper, NioField, NioIcon, NioBadge, NioButton, NioMedia, NioCard } from '../../../../../components';
import { jwtDecode } from "jwt-decode";

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        setUserId(userId);
        const response = await axios.get(`http://localhost:9091/user/${userId}/teams`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [userId]);

  return (
    <div>
      {teams.length === 0 ? (
        <NioCard className="text-center " style={{ width: '50%', margin: 'auto' }}>
          <NioCard.Body>
            <h6 className="text-capitalize display-6 mb-2">
            Ready to <span className="text-indigo">Level Up?</span> Create a <span className="text-red-400">Team</span> and let <span className="text-indigo">the challenge</span> begin.
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
          {teams.map(team => (
            <SwiperSlide className="pt-7 pt-md-0 h-auto" key={team._id}>
              <div className="nk-testimonial-wrap nk-testimonial-wrap-s2 ">
                <div className="nk-testimonial-card nk-testimonial-card-s2 bg-white text-center">
                  <div className="nk-testimonial-content">
                    <div className="card-content pt-4">
                      <div className="card-image">
                        <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                      </div>
                      <h2 className="text-center text-capitalize m-0">
                        {team.teamname}
                      </h2>
                      <div className="media-text">
                        <span className="lead-text fw-normal">
                        <NioMedia size="md" rounded img={team.imageUser} />                          <p>
                            <strong>Team Leader:</strong> {team.createdByFullName}
                          </p>
                        </span>
                      </div>
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
