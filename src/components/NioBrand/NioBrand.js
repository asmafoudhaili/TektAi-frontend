import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming axios is used for API requests

export default function NioBrand({ variant = "dark", logo = "s1", imageRoot = "/images", size, className, ...props }) {
  const [userData, setUserData] = useState({
    role: "" // Assuming role is included in user data
  });
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:9091/user/getProfile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const userDataResponse = response.data;
          setUserData({
            role: userDataResponse.role || "" // Assuming role is included in user data
          });
          // console.log("Fetched user data. Role:", userDataResponse.role);
        }
      } catch (error) {
        // console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // No dependencies, fetch once when component mounts

  useEffect(() => {
    // Define the redirect path based on userData.role
    let path = "/";
    if (userData.role === 'company') {
      path = "/index-company-home-page";
    } else if (userData.role === 'challenger') {
      path = "/index-challenged-home-page";
    }
    setRedirectPath(path);
    // console.log("Updated redirectPath:", path);
  }, [userData.role]);

  const compClasses = classNames({
    "logo-link": true,
    [`${className}`]: className
  });

  let imgSrc, imgSrcSet;
  if (variant === 'light') {
    imgSrc = `${imageRoot}/logo-${logo}.png`;
    {/* imgSrcSet = `${imageRoot}/logo-${logo}2x.png 2x`; */}
  } else if (variant === 'dark') {
    imgSrc = `${imageRoot}/logo-${logo}-dark.png`;
    {/* imgSrcSet = `${imageRoot}/logo-${logo}-dark2x.png 2x`; */}
  }
  const imageSizeStyle = size ? { width: size, height: 'auto' } : {};

  // console.log("Rendering NioBrand. userData.role:", userData.role, "redirectPath:", redirectPath);

  return (
    <Link to={redirectPath} className={compClasses} {...props}>
      <div className="logo-wrap">
        {variant === "both" && (
          <>
            <img
              className="logo-img logo-light"
              src={imgSrc}
              srcSet={imgSrcSet}
              alt="brand-logo"
              style={imageSizeStyle}
            />
            <img
              className="logo-img logo-dark"
              src={`${imageRoot}${logo}-dark.png`}
              srcSet={`${imageRoot}${logo}-dark2x.png 2x`}
              alt="brand-logo"
              style={imageSizeStyle}
            />
          </>
        )}
        {variant !== "both" && (
          <img
            className="logo-img"
            src={imgSrc}
            srcSet={imgSrcSet}
            alt="brand-logo"
            style={imageSizeStyle}
          />
        )}
      </div>
    </Link>
  );
}
